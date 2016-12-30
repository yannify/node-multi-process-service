const config = require('../../config')
const logger = require('winston')
const promisify = require('es6-promisify')
const azure = require('azure');

// create some promises
const serviceBusService = azure.createServiceBusService(config.azure.serviceBusEndPoint);
const getSubscription = promisify(serviceBusService.getSubscription, serviceBusService);
const createSubscription = promisify(serviceBusService.createSubscription, serviceBusService);

const listenForMessages = () => {
    logger.info('listening....')

    const timeOut = 200; // azure only allows for 230 
    const receiveSubscriptionMessage = promisify(serviceBusService.receiveSubscriptionMessage, serviceBusService);
    receiveSubscriptionMessage('joblogs', 'node-listener', { timeoutIntervalInS: timeOut })
    .then(processReceivedMessage)
    .catch(handleError);
};

const processReceivedMessage = (message) => {
    // TODO:  Do some work here then listen for the next message
    logger.info('message received....');
    logger.info(message);

    listenForMessages();
};

const handleError = (err) => {
    logger.error(err);

    // keep on listening!
    listenForMessages();
};


getSubscription('joblogs', 'node-listener')
.then(listenForMessages) 
.catch((err) => {
    if (err.statusCode != 404) {
        // something bad happend and we don't know how to recover
        logger.error(err);
        throw err;
    }

    // we got a not found so create the subscription
    createSubscription('joblogs', 'node-listener')
    .then(listenForMessages)
    .catch(handleError);
});






'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  AZURE_SERVICE_BUS_AMQP_URI: joi.string()  // this is if we want to use something like tortoise amqp
    .uri({ scheme: 'amqps' })
    .required(),
  AZURE_SERVICE_BUS_ENDPOINT: joi.string()
  .uri({ scheme: 'Endpoint=sb' })
  .required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  azure: {
    serviceBusAmqpUri: envVars.AZURE_SERVICE_BUS_AMQP_URI,
    serviceBusEndPoint: envVars.AZURE_SERVICE_BUS_ENDPOINT
  }
}

module.exports = config
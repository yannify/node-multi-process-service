'use strict'

const common = require('./components/common')
const azure = require('./components/azure') 
const logger = require('./components/logger')

module.exports = Object.assign({}, common, azure, logger)
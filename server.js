'use strict'
const config = require('./config')
const logger = require('winston')

const type = process.env.PROCESS_TYPE

logger.info(`Starting '${type}' process`, { pid: process.pid })

if (type === 'web-api') {
  require('./web-api')
} else if (type === 'message-processor') {
  require('./worker/message-processor')
} else {
  throw new Error(`
    ${type} is an unsupported process type. 
    Use one of: 'web-api', 'message-processor'!
  `)
}
const handler = require('./lambda.js') 

const eventData = require('./event.json')

handler.handler(eventData)
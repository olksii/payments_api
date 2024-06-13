const EventEmitter = require('events');
const {eventLoggerModel} = require('../models/event_logger_model');

const emitter = new EventEmitter();

emitter.on('event', event_message => {
	eventLoggerModel.writeLog(event_message)
		.catch(e => console.log('error', e));
});

module.exports = emitter;

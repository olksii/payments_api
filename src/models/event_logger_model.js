
const {EventLogger} = require('../db/schemas/eventLogger_schema');

const eventLoggerModel = {

	writeLog(log_msg) {
		return EventLogger.create({event_name: log_msg});
	},

};

module.exports = {eventLoggerModel};

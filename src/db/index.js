const {Sequelize} = require('sequelize');

let config = require(__dirname + '/config/config.js');
config = config.development;
if (!config) {
	console.log('error!');
} else {
	console.log('Config ok!');
}

const sequelize = new Sequelize(`${config.dialect}://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`, {logging:false});

async function Authenticate() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

Authenticate().catch(error => {console.error("Error", error)});

module.exports = {sequelize};


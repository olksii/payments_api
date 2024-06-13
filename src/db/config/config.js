const dotenv = require('dotenv');

dotenv.config();
let development;

const DB_USER = 'DB_USER';
const DB_PASS = 'DB_PASS';
const DB_DATABASE = 'DB_DATABASE';
const DB_HOST = 'DB_HOST';
const DB_PORT = 'DB_PORT';

if (!('DB_USER' in process.env)) {
	console.log('DB_USER Is Not found in .env file');
} else if (!('DB_PASS' in process.env)) {
	console.log('DB_PASS Is Not found in .env file');
} else if (!('DB_DATABASE' in process.env)) {
	console.log('DB_DATABASE Is Not found in .env file');
} else if (!('DB_HOST' in process.env)) {
	console.log('DB_HOST Is Not found in .env file');
} else if (!('DB_PORT' in process.env)) {
	console.log('DB_PORT Is Not found in .env file');
} else {
	development = {
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'postgres',
	};
}

module.exports = {development};

// Console.log('Dotenv is', dotenv);

// "require('dotenv').config();"

// module.exports = {
//     "development": {
//         "username": process.env.DB_USER,
//         "password": process.env.DB_PASS,
//         "database": process.env.DB_DATABASE,
//         "host": process.env.DB_HOST,
//         "port":process.env.DB_PORT,
//         "dialect": "postgres"
//     },
//     "development2": {
//         "username": process.env.DB_USER,
//         "password": process.env.DB_PASS,
//         "database": process.env.DB_DATABASE,
//         "host": process.env.DB_HOST2,
//         "port":process.env.DB_PORT2,
//         "dialect": "postgres"
//     },

// };

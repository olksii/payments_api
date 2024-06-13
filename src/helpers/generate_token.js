const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(id, email) {
	const payload = {
		id,
		email,
	};
	return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '240d'});
}

module.exports = {generateToken};

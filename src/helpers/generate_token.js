const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(id, email, roleId) {
	return jwt.sign({id:id, 
		email:email,
		roleId:roleId}, process.env.SECRET_KEY, {expiresIn: '1d'});
}

module.exports = {generateToken};

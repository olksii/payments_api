const {authService} = require('../service/auth_service');
const {responseHandlers} = require('../helpers/response_handlers.js');
const bcrypt = require('bcrypt');
const {generateToken} = require('../helpers/generate_token');

function handleSuccess(res, success_msg = 'Success') {
	if (typeof (success_msg) === 'string') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(success_msg);
	} else {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(success_msg));
	}
}

function handleError(res, errorNumber, errorMsg) {
	responseHandlers.errorHandler('This is error', errorMsg);
	console.log('Erorr number is ', errorNumber);
	res.writeHead(errorNumber, {'Content-Type': 'text/plain'});
	res.end(JSON.stringify(errorMsg));
}

const authController = {

	async registration(req, res) {
		const dataObj = req.body;
		console.log('darta', dataObj);
		try {
			const newUser = await authService.registerNewUser(dataObj);
			console.log('Okey-dokey', newUser);
			handleSuccess(res);
		} catch (error) {
			console.log('Error is ', error);
			handleError(res, error.number, error.msg);
		}
	},

	async login(req, res) {
		const dataObj = req.body;
		console.log('Data obj', req.body);

		try {
			const userExists = await authService.findUser(dataObj);
			if (userExists.length > 0) {
				try {
					dataObj.password && (dataObj.password).length > 0
					const validPasswd = bcrypt.compare(dataObj.password, userExists[0].password);
					console.log('Valid', validPasswd);
					if (validPasswd) {
						const token = generateToken(userExists[0].id, userExists[0].email, userExists[0].role_id);
						console.log('TOKEN IS', token);
						res.send(JSON.stringify({token, user: userExists[0]}));
					} else {
						handleError(res, 400, {paswwd: 'Wrong passwd!'});
					}
				} catch (error) {
					console.log('Error in validPasswd', error);
					return res.status(403).json({message: 'No password!'});
				}
			} else {
				handleError(res, 400, {email: 'User is not found'});
			}
		} catch (error) {
			return error;
		}
	},

	async getUsers(req, res) {
		try {
			const all_users = await authService.getAllUsers();
			console.log('All', all_users);
			handleSuccess(res, all_users);
		} catch (error) {
			return error;
		}
	},

	async deleteUsers(req) {
		const dataObj = req.body;
		try {
			const deletedUser = await authService.deleteUser(dataObj);
			console.log('Deleted user', deletedUser);
			return deletedUser;
		} catch (error) {
			console.log('Error', error);
			return error;
		}
	},

	async addUserToCompany(req, res) {
		const dataObj = req.body;
		try {
			const added = await authService.addUserToCompany(dataObj);
			handleSuccess(res, added);
		} catch (error) {
			return error;
		}
	},

};

module.exports = authController;

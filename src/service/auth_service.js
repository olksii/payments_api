const {user} = require('../validation/user_reg_validation.js');
const {authModel} = require('../models/auth_model.js');
const authService = {

	async registerNewUser(dataObj) {
		let checkUserEmail;
		console.log('DataObj is', dataObj);
		const error = user.validate(dataObj);
		if (Object.keys(error).length !== 0) {
			const error_content = {};
			error_content.number = 409;
			error_content.msg = error[0].message;
			console.log('Error_content', error_content);
			throw (error_content);
		}

		try {
			checkUserEmail = await authModel.checkUsersEmail(dataObj);
		} catch (error) {
			throw error;
		}

		if (checkUserEmail.length > 0) {
			const error_content = {};
			error_content.number = 409;
			error_content.msg = {email: 'Email Already exists'};
			throw (error_content);
		} else {
			try {
				console.log('Darta2 ', dataObj);
				const newUser = await authModel.registerNewUser(dataObj);
				return newUser;
			} catch (error) {
				return error;
			}
		}
	},

	findUser(dataObj) {
		return authModel.checkUsersEmail(dataObj);
	},
	getAllUsers() {
		return authModel.getAllUsers();
	},
	deleteUser() {
		return authModel.deleteUser();
	},

	addUserToCompany(dataObj) {
		return authModel.addUserToCompany(dataObj);
	},
};

module.exports = {authService};

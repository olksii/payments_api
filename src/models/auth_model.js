const {UserOffice} = require('../db/schemas/user_schema.js');
const {Role} = require('../db/schemas/role_schema.js');
const {UserOfficeCompany} = require('../db/associations.js');

const bcrypt = require('bcrypt');

const authModel = {

	async registerNewUser(dataObj) {
		const hashPassword = bcrypt.hashSync(dataObj.password, 7);
		dataObj.password = hashPassword;
		try {
			console.log('data obj is ', dataObj);
			const newUser = await UserOffice.create({
				username: dataObj.name, email: dataObj.email, password: dataObj.password, role_id: dataObj.role_id,
			});
			console.log('New User', newUser);
			return newUser;
		} catch (error) {
			console.log('New User error', error);
			return error;
		}
	},
	async checkUsersEmail(dataObj) {
		try {
			const foundUser = await UserOffice.findAll({where: {email: dataObj.email}, include: Role});
			return foundUser;
		} catch (error) {
			return error;
		}
	},
	async getAllUsers() {
		try {
			const allUsers = await UserOffice.findAll();
			return allUsers;
		} catch (error) {
			return error;
		}
	},
	async deleteUser() {
		try {
			const deletedUser = await UserOffice.destroy({where: {id: dataObj.user_id}});
			return deletedUser;
		} catch (error) {
			console.log('Error in deleteUser model is ', error);
			return error;
		}
	},

	async addUserToCompany({user, company}) {
		try {
			const userAddedToCompany = await UserOfficeCompany.create({UserOfficeId: user, CompanyId: company});
			console.log('user Added to company', userAddedToCompany);
			return userAddedToCompany;
		} catch (error) {
			console.log('Error1', error);
			return error;
		}
	},
	// FindUserInCompany: async function({user,company})
};

module.exports = {authModel};

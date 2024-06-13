const {UserOffice} = require('../db/schemas/user_schema.js');
const {Role} = require('../db/schemas/role_schema.js');
const {UserOfficeCompany} = require('../db/associations.js');

const bcrypt = require('bcrypt');

const authModel = {

	async registerNewUser(dataObj) {
		dataObj.password = bcrypt.hashSync(dataObj.password, 7);
		try {
			return await UserOffice.create({
				username: dataObj.name, email: dataObj.email, password: dataObj.password, role_id: dataObj.role_id,
			});
		} catch (error) {
			return error;
		}
	},
	async checkUsersEmail(dataObj) {
		try {
			return await UserOffice.findAll({where: {email: dataObj.email}, include: Role});
		} catch (error) {
			return error;
		}
	},
	async getAllUsers() {
		try {
			return await UserOffice.findAll();
		} catch (error) {
			return error;
		}
	},
	async deleteUser() {
		try {
			return await UserOffice.destroy({where: {id: dataObj.user_id}});
		} catch (error) {
			return error;
		}
	},

	async addUserToCompany({user, company}) {
		try {
			return await UserOfficeCompany.create({UserOfficeId: user, CompanyId: company});
		} catch (error) {
			console.log('Error1', error);
			return error;
		}
	},
};

module.exports = {authModel};

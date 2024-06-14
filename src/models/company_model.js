const {Company} = require('../db/schemas/company_schema.js');

const companyModel = {

	async getCompanies() {
		try {
			return await Company.findAll();
		} catch (error) {
			return error;
		}
	},

	async addNewCompany(dataObj) {
		try {
			return await Company.create({company_name: dataObj.name, company_INN: dataObj.INN});
		} catch (error) {
			return error;
		}
	},

};

module.exports = {companyModel};

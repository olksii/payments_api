const {Company} = require('../db/schemas/company_schema.js');

const companyModel = {

	async getCompanies() {
		try {
			const allCompanies = await Company.findAll();
			return allCompanies;
		} catch (error) {
			return error;
		}
	},

	async addNewCompany(dataObj) {
		try {
			const newCompany = await Company.create({company_name: dataObj.name, company_INN: dataObj.INN});
			return newCompany;
		} catch (error) {
			return error;
		}
	},

};

module.exports = {companyModel};

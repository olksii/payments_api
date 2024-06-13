const {companyModel} = require('../models/company_model.js');

const companyService = {

	getCompanies() {
		return companyModel.getCompanies();
	},
	createCompany(dataObj) {
		return companyModel.addNewCompany(dataObj);
	},

};

module.exports = {companyService};

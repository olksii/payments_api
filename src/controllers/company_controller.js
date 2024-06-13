const {companyService} = require('../service/company_service.js');

function handleSuccess(res, success_msg = 'Success') {
	if (typeof (success_msg) === 'string') {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(success_msg);
	} else {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(success_msg));
	}
}

const companyController = {

	async getCompanies(req, res) {
		try {
			const companies = await companyService.getCompanies();
			handleSuccess(res, companies);
		} catch (error) {
			console.log('Error', error);
		}
	},
	async createCompany(req, res) {
		const dataObj = req.body;
		try {
			const newCompany = await companyService.createCompany(dataObj);
			handleSuccess(res, newCompany);
		} catch (error) {
			console.log('Error', error);
		}
	},
};

module.exports = {companyController};

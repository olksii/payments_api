const {currencyService} = require('../service/currency_service.js');
const {responseHandlers} = require('../helpers/response_handlers.js');

const currencyController = {

	async addCurrency(req, res) {
		try {
			const requestData = req.body;
			const addedCurrency = await currencyService.addCurrency(requestData);
			responseHandlers.successHandler(res, addedCurrency);
		} catch (error) {
			responseHandlers.errorHandler(res, error);
		}
	},
	async getCurrency(req, res) {
		try {
			const allCurrency = await currencyService.getCurrency();
			responseHandlers.successHandler(res, allCurrency);
		} catch (error) {
			responseHandlers.errorHandler(res, error);
		}
	},

};

module.exports = {currencyController};

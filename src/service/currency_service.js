const {currencyModel} = require('../models/currency_model.js');

const currencyService = {

	addCurrency(requestData) {
		return currencyModel.addCurrency(requestData);
	},
	getCurrency() {
		return currencyModel.getCurrency();
	},
};

module.exports = {currencyService};

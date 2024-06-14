const {Currency} = require('../db/schemas/currency_schema.js');

const currencyModel = {

	async addCurrency(requestData) {
		try {
			return await Currency.create({
				name: requestData.name,
				sign: requestData.sign,
				description: requestData.description,
			});
		} catch (error) {
			return (error);
		}
	},
	async getCurrency() {
		try {
			return Currency.findAll({where: {enabled: true}});
		} catch (error) {
			return (error);
		}
	},
};

module.exports = {currencyModel};

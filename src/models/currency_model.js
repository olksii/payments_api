const {Currency} = require('../db/schemas/currency_schema.js');

const currencyModel = {

	async addCurrency(requestData) {
		try {
			const addedCurency = await Currency.create({
				name: requestData.name,
				sign: requestData.sign,
				description: requestData.description,
			});
			return (addedCurency);
		} catch (error) {
			return ('Model', error);
		}
	},
	async getCurrency() {
		try {
			const allCurrency = await Currency.findAll({where: {enabled: true}});
			return (allCurrency);
		} catch (error) {
			return (error);
		}
	},
};

module.exports = {currencyModel};

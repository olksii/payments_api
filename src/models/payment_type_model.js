const {PaymentType} = require('../db/schemas/payment_type_schema.js');

const paymentTypeModel = {

	async createPaymentType(requestData) {
		try {
			 return await PaymentType.create({
				name: requestData.name,
				description: requestData.description,
			});
		} catch (error) {
			return (error);
		}
	},
	async getPaymentTypes() {
		try {
			return await PaymentType.findAll({where: {enabled: true}});
		} catch (error) {
			return (error);
		}
	},
	async getPaymentTypeById(requestData) {
		try {
			return await PaymentType.findOne({where: {enabled: true, id: requestData.id}});
		} catch (error) {
			return (error);
		}
	},

};

module.exports = {paymentTypeModel};

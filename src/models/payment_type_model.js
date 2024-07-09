const {PaymentType} = require('../db/schemas/payment_type_schema.js');

const paymentTypeModel = {

	async createPaymentType(requestData) {
		try {
			const newPaymentType = await PaymentType.create({
				name: requestData.name,
				description: requestData.description,
			});
			return (newPaymentType);
		} catch (error) {
			return ('Model', error);
		}
	},
	async getPaymentTypes() {
		try {
			const allPaymentTypes = await PaymentType.findAll({where: {enabled: true}});
			return allPaymentTypes;
		} catch (error) {
			return ('Model', error);
		}
	},
	async getPaymentTypeById(requestData) {
		try {
			const paymentType = await PaymentType.findOne({where: {enabled: true, id: requestData.id}});
			return paymentType;
		} catch (error) {
			return ('Model', error);
		}
	},

};

module.exports = {paymentTypeModel};

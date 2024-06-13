const {PaymentStatus} = require('../db/schemas/payment_status_schema.js');

const paymentStatusModel = {

	async createPaymentStatus(requestData) {
		try {
			const newPaymentStatus = await PaymentStatus.create({name: requestData.name, description: requestData.description});
			return newPaymentStatus;
		} catch (error) {
			throw ('Error', error);
		}
	},

	async getPaymentStatus(){
		try {
			const paymentStatus = await PaymentStatus.findAll({where:{enabled:true}})
			return paymentStatus;
		} catch (error) {
			throw ('Error', error);
		}
	}
};

module.exports = {paymentStatusModel};

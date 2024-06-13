const {PaymentStatus} = require('../db/schemas/payment_status_schema.js');

const paymentStatusModel = {

	async createPaymentStatus(requestData) {
		try {
			return await PaymentStatus.create({name: requestData.name, description: requestData.description});
		} catch (error) {
			throw new Error (`Error:${error}`);
		}
	},

	async getPaymentStatus(){
		try {
			return await PaymentStatus.findAll({where:{enabled:true}})
		} catch (error) {
			throw new Error (`Error:${error}`);
		}
	}
};

module.exports = {paymentStatusModel};

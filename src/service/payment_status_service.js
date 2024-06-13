const {paymentStatusModel} = require('../models/payment_status_model');

const paymentStatusService = {
	createPaymentStatus(requestData) {
		return paymentStatusModel.createPaymentStatus(requestData);
	},
	getPaymentStatus(){
		return paymentStatusModel.getPaymentStatus();
	}
};

module.exports = {paymentStatusService};

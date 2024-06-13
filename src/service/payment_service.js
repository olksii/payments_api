const {paymentModel} = require('../models/payment_model.js');

const paymentService = {

	getPayments(list) {
		return paymentModel.getPayments(list);
	},

	getPaymentById(id, sortField, sortOrder) {
		return paymentModel.getPaymentById(id, sortField, sortOrder);
	},

	getPaymentsByUserId(list) {
		return paymentModel.getPaymentsByUserId(list);
	},

	createPayment(requestData, filename) {
		return paymentModel.createPayment(requestData, filename);
	},

	createPaymentContractorRepresentativeContractor(requestData, filename) {
		return paymentModel.createPaymentContractorRepresentativeContractor(requestData, filename);
	},

	deletePayment(id) {
		return paymentModel.deletePayment(id);
	},

	editPaymentStatus(id, dataObj) {
		return paymentModel.editPaymentStatus(id, dataObj);
	},
};

module.exports = {paymentService};

const {paymentModel} = require('../models/payment_model.js');

const paymentService = {

	getPayments(filter, sortField, sortOrder, list) {
		return paymentModel.getPayments(filter, sortField, sortOrder, list);
	},

	getPaymentById(id, sortField, sortOrder) {
		return paymentModel.getPaymentById(id, sortField, sortOrder);
	},

	getPaymentsByUserId(id, filter, sortField, sortOrder ) {
		return paymentModel.getPaymentsByUserId(id, filter, sortField, sortOrder );
	},

	createPayment(requestData, filelink) {
		return paymentModel.createPayment(requestData, filelink);
	},

	createPaymentContractorRepresentativeContractor(requestData, filelink) {
		return paymentModel.createPaymentContractorRepresentativeContractor(requestData, filelink);
	},

	deletePayment(id) {
		return paymentModel.deletePayment(id);
	},

	editPaymentStatus(id, dataObj) {
		return paymentModel.editPaymentStatus(id, dataObj);
	},
};

module.exports = {paymentService};

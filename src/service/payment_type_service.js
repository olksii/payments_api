const {paymentTypeModel} = require('../models/payment_type_model.js');

const paymentTypeService = {

	getPaymentTypes() {
		return paymentTypeModel.getPaymentTypes();
	},
	createPaymentType(requestData) {
		return paymentTypeModel.createPaymentType(requestData);
	},

};

module.exports = {paymentTypeService};

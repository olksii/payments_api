const {paymentTypeService} = require('../service/payment_type_service.js');
const {responseHandlers} = require('../helpers/response_handlers.js');

const paymentTypeController = {

	async getPaymentTypes(req, res) {
		try {
			const paymentTypes = await paymentTypeService.getPaymentTypes();
			responseHandlers.successHandler(res, paymentTypes);
		} catch (error) {
			responseHandlers.errorHandler(error);
		}
	},
};

module.exports = {paymentTypeController};

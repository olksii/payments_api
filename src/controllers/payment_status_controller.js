const {paymentStatusService} = require('../service/payment_status_service');
const {responseHandlers} = require('../helpers/response_handlers.js');

const paymentStatusController = {

	async createPaymentStatus(req, res) {
		try {
			const requestData = req.body;
			const newPaymentStatus = await paymentStatusService.createPaymentStatus(requestData);
			responseHandlers.successHandler(res, newPaymentStatus);
		} catch (error) {
			responseHandlers.errorHandler(res, error);
		}
	},

	async getPaymentStatus(req, res) { 
		try {
			const paymentStatus = await paymentStatusService.getPaymentStatus();
			responseHandlers.successHandler(res, paymentStatus)
		} catch (error) {
			responseHandlers.errorHandler(res, error)
		}
	}

};

module.exports = {paymentStatusController};

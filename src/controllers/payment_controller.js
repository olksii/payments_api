
const {paymentService} = require('../service/payment_service.js');
const {contractorService} = require('../service/contractor_service.js');
const {responseHandlers} = require('../helpers/response_handlers.js');

const paymentController = {

	async createPayment(req, res, filename) {
		const requestData = req.body;
		console.log('dataObj', requestData);
		console.log('Link', filename);
		try {
			const newPayment = await paymentService.createPayment(requestData, filename);
			console.log('New Payemtn44', newPayment);
			responseHandlers.successHandler(res, newPayment);
		} catch (error) {
			console.log('error', error);
		}
	},
	async createPaymentContractorRepresentativeContractor(req, res, filename) {
		try {
			const requestData = req.body;
			let newPayment;
			const contractorId = await contractorService.getContractorByInn(requestData);
			if (contractorId) {
				console.log('EXisted contractor', contractorId.id);
				requestData.contractor_id = contractorId.id;
				console.log('req data2', requestData);
				newPayment = await paymentService.createPayment(requestData, filename);
			} else {
				console.log('New contractor', contractorId);
				newPayment = await paymentService.createPaymentContractorRepresentativeContractor(requestData, filename);
			}

			responseHandlers.successHandler(res, newPayment);
		} catch (error) {
			console.log('THIS IS ERROR1!');
			console.log('Error in Controller', error.errors);
			responseHandlers.errorHandler(res, error);
		}
	},

	async getPayments(req, res) {
		const role = req.user.role;
		let list = req.list;
		let payments;

		try {
			if(role === 'admin' || role === 'boss' || role === 'accountant'){
				 payments = await paymentService.getPayments(list);
			}
			else{
				list.id = req.user.id
				payments = await paymentService.getPaymentsByUserId(list);
			}
			
			const length = payments.length;
			const pages = Math.ceil(length/req.list.limit)
			const response = {
				total_items:length,
				total_pages:pages,
				content:payments
			};

			responseHandlers.successHandler(res, response);
		} catch (error) {
			console.log('Error payment1 controller', error);
		}
	},

	async getPaymentById(req, res) {
		const {id} = req.params;
		try {
			const payment = await paymentService.getPaymentById(id);
			const length = payment.length;
			const pages = Math.ceil(length/req.list.limit)
			const response = {
				total_items:length,
				total_pages:pages,
				content:payment
			};
			responseHandlers.successHandler(res, response);
		} catch (error) {
			console.log('Error payment2 controller', error);
		}
	},
	async getPaymentsByUserId(req, res) {
		let list = req.list;
		try {
			const payments = await paymentService.getPaymentsByUserId(list);
			const length = payments.length;
			const pages = Math.ceil(length/req.list.limit)
			const response = {
				total_items:length,
				total_pages:pages,
				content:payments
			};
			responseHandlers.successHandler(res, response);
		} catch (error) {
			console.log('Error payment3 controller', error);
		}
	},


	async editPayment(req, res, filename) {
		const {id} = req.params;
		const dataObj = req.body;
		console.log('dataObj', dataObj);
		console.log('Link', filename);

		try {
			const deletedPayment = await paymentService.deletePayment(id);
			console.log('deleted', deletedPayment);
			const newPayment = await paymentService.createPayment(dataObj, filename);
			console.log('New Payemtn', newPayment);
			responseHandlers.successHandler(res, newPayment);
		} catch (error) {
			console.log('This is error in payment controller', error);
		}
	},

	async deletePayment(req, res) {
		const {id} = req.params;
		try {
			const deletedPayment = await paymentService.deletePayment(id);
			console.log(deletedPayment);
			responseHandlers.successHandler(res, deletedPayment);
		} catch (error) {
			console.log('This is error in payment controller', error);
		}
	},

	async editPaymentStatus(req, res) {
		const {id} = req.params;
		const dataObj = req.body;
		console.log('Data obj', dataObj);
		try {
			const editedPayment = await paymentService.editPaymentStatus(id, dataObj);
			console.log('Edited payment is', editedPayment);
			responseHandlers.successHandler(res, editedPayment);
		} catch (error) {
			console.log('Error in editting payment is', error);
			responseHandlers.handleError(res, error.number, error.msg);
		}
	},
};

module.exports = {paymentController};

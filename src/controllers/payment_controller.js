
const {paymentService} = require('../service/payment_service.js');
const {contractorService} = require('../service/contractor_service.js');
const {responseHandlers} = require('../helpers/response_handlers.js');
const awsOperations = require('../helpers/aws/aws_s3_operations.js');

const paymentController = {

	async createPayment(req, res, filelink) {
		const requestData = req.body;
		try {
			const newPayment = await paymentService.createPayment(requestData, filelink);
			responseHandlers.successHandler(res, newPayment);
		} catch (error) {
			console.log('error', error);
		}
	},
	async createPaymentContractorRepresentativeContractor(req, res, filelink) {
		try {
			const requestData = req.body;
			let newPayment;
			const contractorId = await contractorService.getContractorByInn(requestData);
			if (contractorId) {
				console.log("OK", contractorId)
				requestData.contractor_id = contractorId.id;
				newPayment = await paymentService.createPayment(requestData, filelink);
			} else {
				console.log('no conractor')
				newPayment = await paymentService.createPaymentContractorRepresentativeContractor(requestData, filelink);
			}
			responseHandlers.successHandler(res, newPayment);
		} catch (error) {
			console.log('Error in Controller', error.errors);
			responseHandlers.errorHandler(res, error);
		}
	},

	async getPayments(req, res, filter, sortField, sortOrder, list) {
		const role = req.user.role;
		
		let payments;
		console.log('req.user ', req.user)

		try {
			if(role === 'admin' || role === 'boss' || role === 'accountant'){
				 payments = await paymentService.getPayments( filter, sortField, sortOrder, list);
			}
			else{
				const id = req.user.id
				payments = await paymentService.getPaymentsByUserId( id, filter, sortField, sortOrder);
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

	async getPaymentById(req, res, sortField, sortOrder) {
		const {id} = req.params;
		try {
			const payment = await paymentService.getPaymentById(id);
			responseHandlers.successHandler(res, payment);
		} catch (error) {
			console.log('Error payment controller', error);
		}
	},

	async getPaymentsByUserId(req, res) {
		let sortField = req.query.sort || 'created_at';
		let sortOrder = (req.query.order || 'DESC').toUpperCase();
		let filter = {};
		if(req.query){
			Object.keys(req.query).forEach((name) =>{
				if(name === 'sort'){
					sortField = req.query[name];
				}else if(name === 'order'){
					sortOrder = req.query[name];
				}else{
					filter[name]=req.query[name]
				}
				console.log('Elem', name)
				console.log('Elem data', req.query[name])
			})
			console.log('Data after ', sortField, sortOrder, filter)
		}

		const {id} = req.params;
		try {
			const payments = await paymentService.getPaymentsByUserId(id, sortField, sortOrder, filter);
			responseHandlers.successHandler(res, payments);
		} catch (error) {
			console.log('Error payment controller', error);
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
			const deletePayement = await paymentService.getPaymentById(id)

			const fileLink = (deletePayement.file_link).split('/');
			const fileName = fileLink[fileLink.length - 1];
			

			const deletedPayment = await paymentService.deletePayment(id);
			const deletedFile = await awsOperations.deleteFileFromS3(fileName)

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

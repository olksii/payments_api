const express = require('express');
const multer = require('multer');
const awsOperations = require('../helpers/aws/aws_s3_operations.js');
const {paymentController} = require('../controllers/payment_controller.js');
const router = express.Router();
const {middleware} = require('../middleware/middleware.js');
const api_link = '/api/3.0';

const upload = multer({ storage: multer.memoryStorage() });


let filelink = ''

router.post(`${api_link}/payment`, upload.single('file'), async(req, res) => {
	const {body} = req;
	const {file} = req;
	const OBJjavascript = JSON.parse(JSON.stringify(body));

	if (file) {
		filelink = await awsOperations.uploadFileToS3(file);
		
	} else {
		console.log('File NO');
		filelink = 'no_file';
	}

	if (OBJjavascript.hasOwnProperty('contractor_id')) {
		console.log('OBJjavascript', OBJjavascript)
		paymentController.createPayment(req, res, filelink);
	} else {
		console.log('NO OBJjavascript')
		paymentController.createPaymentContractorRepresentativeContractor(req, res, filelink);
	}

});

// Get all payments
router.get(`${api_link}/payments`, middleware.paginateRequest, (req, res) => {
	console.log('Thios', req.list)
	let sortField = req.query.sort || 'created_at';
	let sortOrder = (req.query.order || 'DESC').toUpperCase();
	
	
	console.log('SortField', sortField);
	console.log('SortOrder', sortOrder);
	console.log('This3', req.query.params)

	let filter = req.list.filter;
	const list = req.list;

	if(req.query.params){
		console.log('Req query', req.query.params)
		filter = {...req.query.params}
		console.log('Fol is', filter)
	}

	paymentController.getPayments(req, res, filter, sortField, sortOrder, list);
});

router.get(`${api_link}/payment/:id`, (req, res) => {
	console.log('here')
	let sortField = req.query.sort || 'created_at';
	let sortOrder = (req.query.order || 'DESC').toUpperCase();
	console.log('req', req.params.id);
	console.log('This')
	paymentController.getPaymentById(req, res, sortField, sortOrder);
});

//получение всех платежей конкретного пользователя по id пользователя
router.get(`${api_link}/payments/:id`, (req, res, ) => {
	
	paymentController.getPaymentsByUserId(req, res);
});

router.delete(`${api_link}/payments/:id`, (req, res) => {
	console.log('This triggers');
	paymentController.deletePayment(req, res);
});

router.put(`${api_link}/payments/:id`, upload.single('file'), (req, res) => {
	const {body} = req;
	const {file} = req;
	if (file) {
		console.log('File exists');
		
	} else {
		console.log('No file');
		filelink = 'no_file';
	}

	paymentController.editPayment(req, res, filelink);
});

router.put(`${api_link}/payment_change_status/:id`, (req, res) => {
	paymentController.editPaymentStatus(req, res);
});

module.exports = router;

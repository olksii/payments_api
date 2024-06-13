const dotenv = require('dotenv');
const express = require('express');
const multer = require('multer');
const {paymentController} = require('../controllers/payment_controller.js');
const router = express.Router();
const {middleware} = require('../middleware/middleware.js');

const serverUrl = process.env.FILE_STORAGE_SERVER_IP;
const filePath = process.env.FILE_STORAGE_LOCATION_PATH;
// Const link = '//192.168.23.91/Payments'

// const link = '//192.168.23.91/'

// last real server link;
// const link = '//192.168.23.100/';

// адресс сервера на котором сохранены файлы и на котором запушен http сервер для получения этих файлов по ссылке.
const link = '//192.168.23.5/';

// Имя начала ссылки URI
const api_link = '/api/3.0';

// Last real server path
// const filepath = 'X:/Payments/PaymentsFiles';

// test server path
// const filepath = 'X:/TestPaymentsFolder';

// локальный путь по которому сохраняются файлы
// const filepath = '/home/joseph/Documents/PaymentFiles';

const filepath = 'C:/Users/derek/Desktop/Unison Payments/payment_files';

let filename = '';

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, filepath);
	},

	filename(req, file, cb) {
		const extension = file.originalname.split('.')[(file.originalname.split('.')).length - 1];
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		filename = uniqueSuffix + '.' + extension;
		cb(null, filename);
	},
});

const upload = multer({storage});

router.post(`${api_link}/payment`, upload.single('file'), (req, res, next) => {
	const {body} = req;
	const {file} = req;

	const OBJjavascript = JSON.parse(JSON.stringify(body));

	if (file) {
		console.log('File exists');
		const filelink = link + '/' + file.originalname;
		console.log('Linkfile', filelink);
	} else {
		console.log('File NO');
		filename = 'no_file';
	}

	// if (OBJjavascript.hasOwnProperty('contractor_id')) {
	// 	paymentController.createPayment(req, res, filename);
	// } else {
	// 	paymentController.createPaymentContractorRepresentativeContractor(req, res, filename);
	// }
	if (OBJjavascript.hasOwnProperty('contractor_id')) {
		paymentController.createPayment(req, res, filename).catch(next);
	} else {
		paymentController.createPaymentContractorRepresentativeContractor(req, res, filename).catch(next);
	}
	


	// PaymentController.getPayments(req, res)
});

// Get all payments
router.get(`${api_link}/payments`, middleware.paginateRequest(), (req, res, next) => {
	paymentController.getPayments(req, res).catch(next);
});
// Get payment by id
router.get(`${api_link}/payment/:id`, (req, res, next) => {
	let sortField = req.query.sort || 'created_at';
	let sortOrder = (req.query.order || 'DESC').toUpperCase();
	paymentController.getPaymentById(req, res, sortField, sortOrder).catch(next);
});
//Get all payments by userid 
router.get(`${api_link}/payments/:id`, middleware.paginateRequest(), (req, res, next) => {
	paymentController.getPaymentsByUserId(req, res).catch(next);
});

router.delete(`${api_link}/payments/:id`, (req, res, next) => {
	paymentController.deletePayment(req, res).catch(next);
});

router.put(`${api_link}/payments/:id`, upload.single('file'), (req, res, next) => {
	const {file} = req;
	if (file) {
		console.log('File exists');
	} else {
		console.log('No file');
		filename = 'no_file';
	}

	paymentController.editPayment(req, res, filename).catch(next);
});

router.put(`${api_link}/payment_change_status/:id`, (req, res, next) => {
	paymentController.editPaymentStatus(req, res).catch(next);
});

module.exports = router;

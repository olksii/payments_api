const multer = require('multer');

const filepath2 = 'C:/Users/Lexus/Documents/test_files_storage';
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

module.exports = {upload, filename};

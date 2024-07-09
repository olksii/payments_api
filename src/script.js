const express = require('express');
const app = express();
const cors = require('cors');

const server = require('http').createServer(app);
const path = require('path');

require('./db/associations.js');
require('./testdb.js');

const paymentRoutes = require('./routes/payment_routes');
const authRoutes = require('./routes/auth_routes');
const companyRoutes = require('./routes/company_routes.js');
const currencyRoutes = require('./routes/currency_routes.js');
const contractorRoutes = require('./routes/contractor_routes.js');
const paymentTypesRoutes = require('./routes/payment_type_routes.js');
const documentStatusRoutes = require('./routes/document_routes.js');
const paymentStatusRoutes = require('./routes/payment_status_routes.js');

const {middleware} = require('./middleware/middleware');
const PORT = 8777;


// const api_link = 'http://payit.uni.com.ua';
const api_link = 'http://localhost';

const api_link_dev = 'http://payments.uatobacco.com.ua';



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use((req, res, next) => {

	next();
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views/'));


app.options('/*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', api_link);
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.send(200);
});

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', api_link);
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Headers: X-Requested-With, privatekey');
	next();
});


app.use(express.static(path.join(__dirname, '/client')));

app.use(express.json());

app.get('/', (req, res) => {
	res.render('index.ejs');
});

app.use(authRoutes);

app.use('/', middleware.checkToken);

app.use(paymentRoutes);
app.use(companyRoutes);
app.use(currencyRoutes);
app.use(contractorRoutes);
app.use(paymentTypesRoutes);
app.use(documentStatusRoutes);
app.use(paymentStatusRoutes);

app.get('/500', (req, res, next) => {
	next(new Error('Something went wrong'));
});

app.use((req, res, next) => {
	res.status(404);
	res.format({
		// Html: function () {
		//   res.render('error.ejs', { url: req.url })
		// },
		json() {
			res.json({error: 'Not found'});
		},
		default() {
			res.type('txt').send('Not found');
		},
	});
});

app.use((err, req, res, next) => {
	err = err.toString();
	res.status(err.status || 500);

	res.format({
		// Html: function () {
		//   res.render({ error: err });
		// },
		json() {
			res.json({error: err});
		},
		default() {
			res.type('txt').send(err);
		},
	});
});

module.exports = {app, server};


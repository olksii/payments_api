const express = require('express');
const router = express.Router();

const {paymentStatusController} = require('../controllers/payment_status_controller');
const { middleware } = require('../middleware/middleware');

const api_link = '/api/3.0';

router.post(`${api_link}/paymentstatus`, (req, res) => {
	paymentStatusController.createPaymentStatus(req, res);
});

router.get(`${api_link}/paymentstatus`, (req, res) => {
	paymentStatusController.getPaymentStatus(req, res);
});

module.exports = router;

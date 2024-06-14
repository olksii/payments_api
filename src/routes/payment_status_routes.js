const express = require('express');
const router = express.Router();

const {paymentStatusController} = require('../controllers/payment_status_controller');

const api_link = '/api/3.0';

router.post(`${api_link}/paymentstatus`, (req, res, next) => {
	paymentStatusController.createPaymentStatus(req, res).catch(next);
});

router.get(`${api_link}/paymentstatus`, (req, res, next) => {
	paymentStatusController.getPaymentStatus(req, res).catch(next);
});

module.exports = router;

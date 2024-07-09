const express = require('express');
const router = express.Router();

const {paymentTypeController} = require('../controllers/payment_type_controller.js');

const api_link = '/api/3.0';

// Получаем всех типы платежей
router.get(`${api_link}/paymenttypes`, (req, res) => {
	paymentTypeController.getPaymentTypes(req, res);
});

module.exports = router;

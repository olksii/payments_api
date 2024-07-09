const express = require('express');
const router = express.Router();

const {currencyController} = require('../controllers/currency_controller.js');

const api_link = '/api/3.0';

router.get(`${api_link}/currency`, (req, res) => {
	currencyController.getCurrency(req, res);
});

router.post(`${api_link}/currency`, (req, res) => {
	currencyController.addCurrency(req, res);
});

module.exports = router;

const express = require('express');
const router = express.Router();

const {currencyController} = require('../controllers/currency_controller.js');

const api_link = '/api/3.0';

router.get(`${api_link}/currency`, (req, res, next) => {
	currencyController.getCurrency(req, res).catch(next);
});

router.post(`${api_link}/currency`, (req, res, next) => {
	currencyController.addCurrency(req, res).catch(next);
});

module.exports = router;

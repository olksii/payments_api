const express = require('express');
const router = express.Router();

const {companyController} = require('../controllers/company_controller.js');

const api_link = '/api/3.0';

router.get(`${api_link}/company`, (req, res, next) => {
	companyController.getCompanies(req, res).catch(next);
});

router.post(`${api_link}/company`, (req, res, next) => {
	companyController.createCompany(req, res).catch(next);
});

module.exports = router;

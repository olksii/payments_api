const express = require('express');
const router = express.Router();

const {companyController} = require('../controllers/company_controller.js');

const api_link = '/api/3.0';

router.get(`${api_link}/company`, (req, res) => {
	companyController.getCompanies(req, res);
});

router.post(`${api_link}/company`, (req, res) => {
	companyController.createCompany(req, res);
});

module.exports = router;

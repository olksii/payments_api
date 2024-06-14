const express = require('express');
const router = express.Router();

const {documentStatusController} = require('../controllers/document_status_controller.js');

const api_link = '/api/3.0';

router.get(`${api_link}/documentstatus`, (req, res, next) => {
	documentStatusController.getDocumentStatus(req, res).catch(next);
});

router.post(`${api_link}/documentstatus`, (req, res, next) => {
	documentStatusController.addDocumentStatus(req, res).catch(next);
});

module.exports = router;

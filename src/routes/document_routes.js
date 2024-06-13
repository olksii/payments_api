const express = require('express');
const router = express.Router();

const {documentStatusController} = require('../controllers/document_status_controller.js');

const api_link = '/api/3.0';

router.get(`${api_link}/documentstatus`, (req, res) => {
	documentStatusController.getDocumentStatus(req, res);
});

router.post(`${api_link}/documentstatus`, (req, res) => {
	documentStatusController.addDocumentStatus(req, res);
});

module.exports = router;

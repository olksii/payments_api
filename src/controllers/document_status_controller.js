
const {documentStatusService} = require('../service/document_status_service.js');
const {responseHandlers} = require('../helpers/response_handlers.js');

const documentStatusController = {

	async addDocumentStatus(req, res) {
		try {
			const requestData = req.body;
			console.log('req data', requestData);
			const addedDocumentStatus = await documentStatusService.addDocumentStatus(requestData);
			responseHandlers.successHandler(res, addedDocumentStatus);
		} catch (error) {
			responseHandlers.errorHandler(error);
		}
	},
	async getDocumentStatus(req, res) {
		try {
			const documentStatus = await documentStatusService.getDocumentStatus();
			responseHandlers.successHandler(res, documentStatus);
		} catch (error) {
			responseHandlers.errorHandler(error);
		}
	},
};

module.exports = {documentStatusController};

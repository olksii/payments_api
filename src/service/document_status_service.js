const {documentStatusModel} = require('../models/document_status_model.js');

const documentStatusService = {

	addDocumentStatus(requestData) {
		return documentStatusModel.addDocumentStatus(requestData);
	},

	getDocumentStatus() {
		return documentStatusModel.getDocumentStatus();
	},

};

module.exports = {documentStatusService};

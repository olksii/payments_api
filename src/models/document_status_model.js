const {DocumentStatus} = require('../db/schemas/document_status_schema.js');

const documentStatusModel = {

	async addDocumentStatus(requestData) {
		try {
			const addDocumentStatus = await DocumentStatus.create({
				name: requestData.name,
				description: requestData.description,
			});
			return (addDocumentStatus);
		} catch (error) {
			return ('Model', error);
		}
	},
	async getDocumentStatus() {
		try {
			const documentStatus = await DocumentStatus.findAll({where: {enabled: true}});
			return (documentStatus);
		} catch (error) {
			return (error);
		}
	},
};

module.exports = {documentStatusModel};

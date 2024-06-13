const {DocumentStatus} = require('../db/schemas/document_status_schema.js');

const documentStatusModel = {

	async addDocumentStatus(requestData) {
		try {
			return await DocumentStatus.create({
				name: requestData.name,
				description: requestData.description,
			});
		} catch (error) {
			return (error);
		}
	},
	async getDocumentStatus() {
		try {
			return await DocumentStatus.findAll({where: {enabled: true}});
		} catch (error) {
			return (error);
		}
	},
};

module.exports = {documentStatusModel};

const {RepresentativeContractor} = require('../db/schemas/representative_contractor_schema.js');

const RepresentativeContractorModel = {
	async createNewRepresentative(requestData) {
		try {
			return await RepresentativeContractor.create({
				name: requestData.name,
				phone: requestData.phone,
				email: requestData.email,
				position: requestData.position,
			});
		} catch (error) {
			return (error);
		}
	},
	async getRepresentativeById(requestData) {
		try {
			return await RepresentativeContractor.findAll({where: {id: requestData.id}});
		} catch (error) {
			return (error);
		}
	},
	async editRepresentativeData(requestData) {
		try {
			return await RepresentativeContractor.update({
				name: requestData.name,
				phone: requestData.phone,
				email: requestData.email,
				position: requestData.position,
			}, {where: {id: requestData.id}});
		} catch (error) {
			return (error);
		}
	},
};

module.exports = {RepresentativeContractorModel};

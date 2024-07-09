const {where} = require('sequelize');
const {RepresentativeContractor} = require('../db/schemas/representative_contractor_schema.js');

const RepresentativeContractorModel = {
	async createNewRepresentative(requestData) {
		try {
			const newRepresentative = await RepresentativeContractor.create({
				name: requestData.name,
				phone: requestData.phone,
				email: requestData.email,
				position: requestData.position,
			});
			return newRepresentative;
		} catch (error) {
			return ('Model', error);
		}
	},
	async getRepresentativeById(requestData) {
		try {
			const allRepresentatives = await RepresentativeContractor.findAll({where: {id: requestData.id}});
			return allRepresentatives;
		} catch (error) {
			return ('Model', error);
		}
	},
	async editRepresentativeData(requestData) {
		try {
			const changedRepresentative = await RepresentativeContractor.update({
				name: requestData.name,
				phone: requestData.phone,
				email: requestData.email,
				position: requestData.position,
			}, {where: {id: requestData.id}});
			return changedRepresentative;
		} catch (error) {
			return ('Model', error);
		}
	},
};

module.exports = {RepresentativeContractorModel};

const {Contractor} = require('../db/schemas/contractor_schema.js');
const {RepresentativeContractor} = require('../db/schemas/representative_contractor_schema.js');
const {Sequelize} = require('sequelize');
const {Op} = require('sequelize');

const contractorModel = {

	async createContractor(requestData) {
		try {
			return await Contractor.create({
				company_name: requestData.company_name,
				company_inn: requestData.company_inn,
				representative_contractor_id: requestData.representative_contractor_id,
			});
		} catch (error) {
			return error;
		}
	},
	async getAllContractors() {
		try {
			return await Contractor.findAll({where: {enabled: true}});
		} catch (error) {
			return error;
		}
	},
	async getAllContractorsWithRepresentatives() {
		try {
			return await Contractor.findAll({where: {enabled: true}, include: RepresentativeContractor});
		} catch (error) {
			return error;
		}
	},
	async getContractorById(id) {
		try {
			return await Contractor.findOne({where: {id}, include: [{model: RepresentativeContractor, as: 'representative_contractor'}]});
		} catch (error) {
			return error;
		}
	},
	async getContractorByInn(requestData) {
		try {
			return await Contractor.findOne({where: {company_inn: requestData.company_inn}});
		} catch (error) {
			return error;
		}
	},
	async getContractorByInnWithRepresentative(requestData) {
		try {
			return await Contractor.findOne({where: {company_inn: requestData.company_inn}, include: RepresentativeContractor});
		} catch (error) {
			return error;
		}
	},
	async getContractorByInnWithRepresentative2(requestData) {
		console.log('ReqINN', requestData.inn);
		try {
			return await Contractor.findAll(
				{
					where: Sequelize.where(Sequelize.cast(Sequelize.col('company_inn'), 'text'), {
						[Op.like]: `%${requestData.inn}%`,
					}),
					include: [{model: RepresentativeContractor, as: 'representative_contractor'}],
				});
			
		} catch (error) {
			console.log('Con2', error);
			return error;
		}
	},

};

module.exports = {contractorModel};

const {sequelize} = require('../db/index.js');
const {Contractor} = require('../db/schemas/contractor_schema.js');
const {RepresentativeContractor} = require('../db/schemas/representative_contractor_schema.js');
const {Sequelize} = require('sequelize');
const {Op} = require('sequelize');

const contractorModel = {

	async createContractor(requestData) {
		try {
			const newContractor = await Contractor.create({
				company_name: requestData.company_name,
				company_inn: requestData.company_inn,
				representative_contractor_id: requestData.representative_contractor_id,
			});
			return newContractor;
		} catch (error) {
			return error;
		}
	},
	async getAllContractors() {
		try {
			const allContractors = await Contractor.findAll({where: {enabled: true}});
			return allContractors;
		} catch (error) {
			return error;
		}
	},
	async getAllContractorsWithRepresentatives() {
		try {
			const allContractors = await Contractor.findAll({where: {enabled: true}, include: RepresentativeContractor});
			return allContractors;
		} catch (error) {
			return error;
		}
	},
	async getContractorById(id) {
		try {
			const contractor = await Contractor.findOne({where: {id}, include: [{model: RepresentativeContractor, as: 'representative_contractor'}]});
			return contractor;
		} catch (error) {
			return error;
		}
	},
	async getContractorByInn(requestData) {
		try {
			const contractor = await Contractor.findOne({where: {company_inn: requestData.company_inn}});
			return contractor;
		} catch (error) {
			return error;
		}
	},
	async getContractorByInnWithRepresentative(requestData) {
		try {
			const contractorWithRepresentative = await Contractor.findOne({where: {company_inn: requestData.company_inn}, include: RepresentativeContractor});
			return contractorWithRepresentative;
		} catch (error) {
			return error;
		}
	},
	async getContractorByInnWithRepresentative2(requestData) {
		console.log('ReqINN', requestData.inn);
		const num = 123;
		try {
			const contractorWithRepresentative = await Contractor.findAll(
				{
					where: Sequelize.where(Sequelize.cast(Sequelize.col('company_inn'), 'text'), {
						[Op.like]: `%${requestData.inn}%`,
					}),
					include: [{model: RepresentativeContractor, as: 'representative_contractor'}],
				});
			return contractorWithRepresentative;
		} catch (error) {
			console.log('Con2', error);
			return error;
		}
	},

};

module.exports = {contractorModel};

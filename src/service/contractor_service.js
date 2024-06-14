const {contractorModel} = require('../models/contractor_model.js');

const contractorService = {

	async createNewContractor(requestData) {
		try {
			const checkContractorInn = await contractorModel.getContractorByInn(requestData);
			if (checkContractorInn.lenght > 0) {
				const error_content = {
					number: 409,
					msg: {conractor: 'Contractor already exists'},
				};
				return (error_content);
			} else {
				const newContractor = await contractorModel.createContractor(requestData);
				return (newContractor);
			}
		} catch (error) {
			throw (error);
		}
	},

	createNewContractor2(requestData) {
		const checkContractorInn = contractorModel.getContractorByInn(requestData);
		if (checkContractorInn.lenght > 0) {
			const error_content = {
				number: 409,
				msg: {conractor: 'Contractor already exists'},
			};
			return (error_content);
		}

		const newContractor = contractorModel.createContractor(requestData);
		return (newContractor);
	},
	getContractorByInn(requestData) {
		return contractorModel.getContractorByInn(requestData);
	},
	getContractorByInnWithRepresentative(requestData) {
		return contractorModel.getContractorByInnWithRepresentative(requestData);
	},
	getContractorByInnWithRepresentative2(requestData) {
		return contractorModel.getContractorByInnWithRepresentative2(requestData);
	},
	getContractorById(id) {
		return contractorModel.getContractorById(id);
	},
	getAllContractors(requestData) {
		return contractorModel.getAllContractors(requestData);
	},
	findAllContractorsWithRepresentatives(requestData) {
		return contractorModel.getAllContractorsWithRepresentatives(requestData);
	},
};

module.exports = {contractorService};

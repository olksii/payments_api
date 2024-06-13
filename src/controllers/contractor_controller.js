const {contractorService} = require('../service/contractor_service.js');
const {responseHandlers} = require('../helpers/response_handlers.js');

const contractorController = {

	async getContractorById(req, res) {
		try {
			const {id} = req.params;
			const contractor = await contractorService.getContractorById(id);
			responseHandlers.successHandler(res, contractor);
		} catch (error) {
			responseHandlers.errorHandler(error);
		}
	},
	async getContractorByInn(req, res) {
		try {
			const requestData = req.body;
			const conractor = await contractorService.getContractorByInn(requestData);
			responseHandlers.successHandler(res, conractor);
		} catch (error) {
			responseHandlers.errorHandler(error);
		}
	},
	async getContractorByInnWithRepresentative(req, res) {
		try {
			const requestData = req.body;
			const conractorWithRepresentative = await contractorService.getContractorByInnWithRepresentative(requestData);
			responseHandlers.successHandler(res, conractorWithRepresentative);
		} catch (error) {
			responseHandlers.errorHandler(error);
		}
	},
	async getContractorByInnWithRepresentative2(req, res) {
		try {
			const requestData = req.query;
			const conractorWithRepresentative = await contractorService.getContractorByInnWithRepresentative2(requestData);
			responseHandlers.successHandler(res, conractorWithRepresentative);
		} catch (error) {
			responseHandlers.errorHandler(error);
		}
	},
	async getAllContractors(req, res) {
		try {
			const allContractors = await contractorService.getAllContractors();
			responseHandlers.successHandler(res, allContractors);
		} catch (error) {
			responseHandlers.errorHandler(error);
		}
	},
};

module.exports = {contractorController};

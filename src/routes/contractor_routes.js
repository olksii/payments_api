const express = require('express');
const router = express.Router();

const {contractorController} = require('../controllers/contractor_controller.js');

const api_link = '/api/3.0';

// Получить контрагента по id
router.get(`${api_link}/contractor/:id`, (req, res, next) => {
	contractorController.getContractorById(req, res).catch(next);
});

// НЕТ ПРЯМОГО ИСПОЛЬЗОВАНИЯ, ПЕРВЫЙ ВАРИАНТ ПОЛУЧЕНИЯ КОНТРАГЕНТА С ПРЕДСТАВИТЕЛЕМ
router.get(`${api_link}/contractor/representative`, (req, res, next) => {
	contractorController.getContractorByInnWithRepresentative(req, res).catch(next);
});

// Получить контрагента и его представителя по ИНН контрагента
router.get(`${api_link}/contractor`, (req, res, next) => {
	contractorController.getContractorByInnWithRepresentative2(req, res).catch(next);
});
// Получаем всех контрагентов без представителей, НЕТ ПРЯМОГО ИСПОЛЬЗОВАНИЯ
router.get(`${api_link}/contractors`, (req, res, next) => {
	contractorController.getAllContractors(req, res).catch(next);
});

module.exports = router;

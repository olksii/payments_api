const express = require('express');
const router = express.Router();

const {contractorController} = require('../controllers/contractor_controller.js');

const api_link = '/api/3.0';

// Получить контрагента по id
router.get(`${api_link}/contractor/:id`, (req, res) => {
	contractorController.getContractorById(req, res);
});

// НЕТ ПРЯМОГО ИСПОЛЬЗОВАНИЯ, ПЕРВЫЙ ВАРИАНТ ПОЛУЧЕНИЯ КОНТРАГЕНТА С ПРЕДСТАВИТЕЛЕМ
router.get(`${api_link}/contractor/representative`, (req, res) => {
	contractorController.getContractorByInnWithRepresentative(req, res);
});

// Получить контрагента и его представителя по ИНН контрагента
router.get(`${api_link}/contractor`, (req, res) => {
	contractorController.getContractorByInnWithRepresentative2(req, res);
});
// Получаем всех контрагентов без представителей, НЕТ ПРЯМОГО ИСПОЛЬЗОВАНИЯ
router.get(`${api_link}/contractors`, (req, res) => {
	contractorController.getAllContractors(req, res);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

router.post('/api/3.0/auth/registration', (req, res) => {
	authController.registration(req, res);
});

router.post('/api/3.0/auth/login', (req, res) => {
	authController.login(req, res);
});

router.post('/api/3.0/auth/registration', (req, res) => {
	authController.registration(req, res);
});

router.post('/api/3.0/auth/login', (req, res) => {
	authController.login(req, res);
});
router.get('/api/3.0/auth/user', (req, res) => {
	authController.getUsers(req, res);
});
router.post('/api/3.0/auth/company', (req, res) => {
	authController.addUserToCompany(req, res);
});

module.exports = router;

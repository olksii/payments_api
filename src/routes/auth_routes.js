const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth_controller');

router.post('/api/3.0/auth/registration', (req, res, next) => {
	authController.registration(req, res).catch(next);
});

router.post('/api/3.0/auth/login', (req, res, next) => {
	authController.login(req, res).catch(next);
});

router.post('/api/3.0/auth/registration', (req, res, next) => {
	authController.registration(req, res).catch(next);
});

router.post('/api/3.0/auth/login', (req, res, next) => {
	authController.login(req, res).catch(next);
});
router.get('/api/3.0/auth/user', (req, res, next) => {
	authController.getUsers(req, res).catch(next);
});
router.post('/api/3.0/auth/company', (req, res, next) => {
	authController.addUserToCompany(req, res).catch(next);
});

module.exports = router;

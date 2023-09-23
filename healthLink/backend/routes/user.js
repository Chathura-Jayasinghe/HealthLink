const express = require('express');
const userController = require('../controllers/user.controller');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);

router.post('/admin/login', userController.adminLogin);
router.post('/doctor/login', userController.doctorLogin);
module.exports = router;
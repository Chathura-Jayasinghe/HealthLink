const express = require('express');
const controller = require('../controllers/adminDashboard.controller');

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/checkAdmin');

const router = express.Router();

router.get('/home' ,checkAuth.checkAuth,checkAdmin.checkAdmin,controller.homeData);
router.delete('/home' ,checkAuth.checkAuth,checkAdmin.checkAdmin,controller.removeDoctor);
router.post('/add-doctor' ,checkAuth.checkAuth,checkAdmin.checkAdmin,controller.addDoctor);


module.exports = router;
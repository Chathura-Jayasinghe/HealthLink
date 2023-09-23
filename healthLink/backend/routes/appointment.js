const express = require('express');
const appointmentController = require('../controllers/appointment.controller');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/doctors' ,appointmentController.filterDoctors);
router.post('/place',checkAuth.checkAuth,appointmentController.placeAppointment);
router.get('/',checkAuth.checkAuth,appointmentController.getAppointments);
router.delete('/',checkAuth.checkAuth,appointmentController.deleteAppointment);


module.exports = router;
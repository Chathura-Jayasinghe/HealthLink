const express = require('express');
const appointmentController = require('../controllers/appointment.controller');
const doctorAppointController = require('../controllers/doctorAppointment.controller');

const checkAuth = require('../middleware/check-auth');
const mspace = require('../middleware/mspace');

const router = express.Router();

router.post('/doctors' ,appointmentController.filterDoctors);
router.post('/place',checkAuth.checkAuth,appointmentController.placeAppointment);
router.get('/',checkAuth.checkAuth,appointmentController.getAppointments);
router.delete('/',checkAuth.checkAuth,appointmentController.deleteAppointment);

router.post('/patients' , doctorAppointController.getDoctorAppointments);
router.post('/getdoctorbyid' , doctorAppointController.getDoctorbyId);
router.post('/add-report' , doctorAppointController.addReport);
router.post('/myreports/user', doctorAppointController.getReportsByUserId);




module.exports = router;
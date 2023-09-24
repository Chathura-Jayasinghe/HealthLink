const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbPool = require('../db');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { doctorLogin } = require('./user.controller');


function getDoctorAppointments(req, res) {
    const { doctor_id } = req.body;

    dbPool.query("SELECT * FROM appointment WHERE doctor_id=?", [doctor_id], (error,results) => {
        if(error) {
            return res.status(250).json({ message: "Error" });
        } else {
            promises = [];

            results.forEach((appointment => {
                const patientDetails = new Promise((resolve, reject) => {
                    dbPool.query("SELECT `id`, `name`, `email` FROM user WHERE id=?", [appointment.user_id], (error,result) => {
                        if (error) {
                            reject(error);
                        } else {
                            if (result.length > 0) {
                                appointment.user = result[0]
                            }
                            resolve();
                        }
                    });
                });
                promises.push(patientDetails);
            }))


            Promise.all(promises).then(() => {
                return res.status(200).json({results: results});
            }) .catch((error) => {
                return res.status(250).json({ message: "An error occurred" });
            });
        }
    })
}


module.exports = {
    getDoctorAppointments: getDoctorAppointments,
} 
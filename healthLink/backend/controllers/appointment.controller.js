const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbPool = require('../db');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');



// Function to generate a random string
const generateRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

// Function to generate a unique user ID using timestamp and random string
const filterDoctors = (req, res) => {

    const maxAppCount = 2;
    const date = req.body.date;
    const name = req.body.name;

    var sql = "SELECT `id`, `name`, `email`, `place` FROM doctor";
    if (name.trim()) {
        sql += " WHERE  `name` LIKE '%" + name + "%'";
    }


    dbPool.query(sql, [], (error, results) => {
        if (error) {
            return res.status(250).json({ message: 'Error', error: error });
        } else {
            const selected = []
            if (date.trim()) {
                const doctorIds = results.map((doctor) => doctor.id).join();

                const appointmentSql =
                    "SELECT `doctor_id`, COUNT(`date`) AS count FROM `appointment` WHERE `date`=? AND `doctor_id` IN (?) GROUP BY `doctor_id`";

                dbPool.query(appointmentSql, [date, doctorIds], (appointmentError, appointmentResults) => {
                    if (appointmentError) {
                        return res.status(250).json({ message: 'Error' });
                    } else {
                        const filteredDoctors = results.filter((doctor) => {
                            const appointment = appointmentResults.find(
                                (appointment) => appointment.doctor_id === doctor.id
                            );
                            const appointmentCount = appointment ? appointment.count : 0;
                            return appointmentCount <= maxAppCount;
                        });

                        return res.status(200).json({ results: filteredDoctors });
                    }
                });
            } else {
                return res.status(200).json({ results: results });
            }
        }
    });

};





function placeAppointment(req, res) {

    const { id, doctorId, time, date } = req.body;


    const sql = `
    SELECT id FROM appointment WHERE doctor_id = ? AND date = ? 
    AND (TIME_TO_SEC(time) BETWEEN TIME_TO_SEC(?)-20*60 AND (TIME_TO_SEC(?) + 20 * 60))`;


    dbPool.query(sql, [doctorId, date, time,time],
        (err, results) => {
            if (err) {
                res.status(250).json({ message: 'An error occurred', err: err });
            } else {
                if (results.length === 0) {
                    if (!id) {
                        const appId = uuidv4();
                        const sql2 = "INSERT INTO `appointment`(`id`, `user_id`, `doctor_id`, `time`, `date`) VALUES (?,?,?,?,?)"
                        dbPool.query(sql2, [appId, req.userData.userId, doctorId, time, date], (error, results) => {
                            if (error) {
                                return res.status(250).json({ message: "Error" });
                            } else {
                                return res.status(201).json({ message: 'Successfully Created' });
                            }
                        });

                    }else{
                        const sql2 = "UPDATE `appointment` SET `time`=?,`date`=? WHERE id=?;";
                        dbPool.query(sql2, [time, date,id], (error, results) => {
                            if (error) {
                                return res.status(250).json({ message: "Error" });
                            } else {
                                return res.status(201).json({ message: 'Successfully Updated' });
                            }
                        });
                        
                    }



                } else {
                    res.status(250).json({ massage: "This time Slot is taken" });
                }
            }
        }
    );
}



function deleteAppointment(req,res){
    dbPool.query("DELETE  FROM appointment WHERE id=?", [req.body.id], (error, result) => {
        if (error) {
            return res.status(250).json({ message: "An error occurred" });
        } else {
            return res.status(200).json({ message: "Successfully Deleted" });
        }
    });
}


function getAppointments(req,res){
   
    dbPool.query("SELECT * FROM appointment WHERE user_id=? ", [req.userData.userId], (error, results) => {
        if (error) {
            return res.status(250).json({ message: "Error" });
        } else {
            promises = [];

            results.forEach((appointment=>{
                const doctorDetail =  new Promise((resolve, reject) => {
                    dbPool.query("SELECT `id`, `name`, `email`, `place` FROM doctor WHERE id=?", [appointment.doctor_id], (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            if(result.length>0){
                                appointment.doctor=result[0]
                            }
                            resolve();
                        }
                    });
                });
                promises.push(doctorDetail);
            }))

            
        
        
            Promise.all(promises)
            .then(() => {
                return res.status(200).json({ results: results });
            })
            .catch((error) => {
                return res.status(250).json({ message: "An error occurred" });
            });
        }
    });
}

module.exports = {
    filterDoctors: filterDoctors,
    placeAppointment: placeAppointment,
    getAppointments,getAppointments,
    deleteAppointment:deleteAppointment
} 
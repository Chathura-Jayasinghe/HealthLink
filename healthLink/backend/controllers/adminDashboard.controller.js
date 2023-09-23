const dbPool = require('../db');
const { v4: uuidv4 } = require('uuid');



function homeData(req, res) {
    const dashboardData = {}
    const promises = [];
    const promise1 = new Promise((resolve, reject) => {
        dbPool.query("SELECT `id`, `name`, `email`, `phone`, `place`,`specialize` FROM `doctor`", [], (error, results) => {
            if (error) {

                reject(error);
            } else {
                dashboardData.doctorDetails = results;
                dashboardData.doctors = results ? results.length : 0
                resolve();
            }

        });
    })
    promises.push(promise1);

    const promise2 = new Promise((resolve, reject) => {
        const sql = "SELECT (SELECT COUNT(*) FROM user) AS users, (SELECT COUNT(*) FROM appointment) AS appointment;"
        dbPool.query(sql, [], (error, results) => {
            if (error) {
                reject(error);
            } else {
                dashboardData.users = results[0].users;
                dashboardData.appointments = results[0].appointment
                resolve();
            }

        });
    })
    promises.push(promise2);


    Promise.all(promises)
        .then(() => {
            return res.status(200).json({ results: dashboardData });
        })
        .catch((error) => {
            return res.status(250).json({ message: "An error occurred", error: error });
        });
}





function removeDoctor(req, res) {
    dbPool.query("DELETE  FROM doctor WHERE id=?", [req.body.id], (error, result) => {
        if (error) {
            return res.status(250).json({ message: "An error occurred" });
        } else {
            return res.status(200).json({ message: "Successfully Deleted" });
        }
    });
}


function addDoctor(req, res) {
    const docId = uuidv4();
    const { name, email, phone, place, password, specialize } = req.body


    dbPool.query('SELECT id FROM doctor WHERE email = ?', [email], (error, results) => {

        if (error) {
            return res.status(250).json({ message: 'Error' });
        } else {
            if (results.length > 0) {
                return res.status(250).json({ message: 'Email alrady exist' });
            } else {
                const sql = "INSERT INTO `doctor`(`id`, `name`, `email`, `phone`, `place`, `password`, `specialize`) VALUES (?,?,?,?,?,?,?)"
                dbPool.query(sql, [docId, name, email, phone, place, password, specialize], (error, result) => {
                    if (error) {
                        
                        return res.status(250).json({ message: "An error occurred" });
                    } else {
                        return res.status(200).json({ message: "Successfully Created" });
                    }
                });
            }
        }
    });



}



module.exports = {
    homeData: homeData,
    removeDoctor: removeDoctor,
    addDoctor, addDoctor,
}
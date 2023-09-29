import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import pat1 from '../../assets/patients/patient1.jpg';
import pat2 from '../../assets/patients/patient2.jpg';
import pat3 from '../../assets/patients/patient3.jpg';
import pat4 from '../../assets/patients/patient4.jpg';
import pat5 from '../../assets/patients/patient5.jpg';
import pat6 from '../../assets/patients/patient6.jpg';
import { Link } from 'react-router-dom';



export default function MyAppointments(props) {
    const [patientData, setPatientData] = useState([]);
    const patientImages = [pat1, pat2, pat3, pat4, pat5, pat6];



    useEffect(() => {
        if (props.patientData) {
            setPatientData(props.patientData);
        }
    }, [props.patientData])


    const dateFormat = (inputDate) => {
        if (inputDate) {
            const formattedDate = new Date(inputDate).toISOString().split('T')[0];
            return formattedDate;
        }
    }



    return (
        <main>
            <div className="table-data " >
                <div className="order boxShadow1 ">
                    <div className="head">
                        <h3>My Appointments</h3>
                        {/* <i className='bx bx-search' ></i>
                        <i className='bx bx-filter' ></i> */}
                    </div>
                    <table>
                        <thead>
                            <tr style={{ color: 'balack' }}>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Add</th>
                                <th>Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientData && patientData.map((patient, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td >
                                           <div className="d-flex">
                                           <img src={patientImages[index%patientImages.length]} />
                                            <p>{patient && patient.user && patient.user.name ? patient.user.name : ''}</p>
                                           </div>
                                        </td>
                                        <td>{patient && patient.user && patient.user.email ? patient.user.email : ''}</td>
                                        <td>{patient.date ? dateFormat(patient.date) : ''}</td>
                                        <td>{patient.time ? patient.time : ''}</td>
                                        <td>
                                            <Link to='/doctor/add-report'

                                                state={{
                                                    username: patient.user.name,
                                                    doctor_id: patient.doctor_id,
                                                    user_id: patient.user_id,
                                                    appointment_id: patient.id,
                                                }} >
                                                <motion.p
                                                    // onClick={() => {
                                                    //     reqSend.swalFireReq1("DELETE", 'admin/home', { id: patient.id },
                                                    //         "Appointment Calceled", "Error While Cancelling", (response) => {
                                                    //             setIsComponentChanged(!isComponentChanged)
                                                    //         }, "Error! Check Your Connection");
                                                    // }}
                                                    whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status delivered" style={{ color: '#000', fontSize: '15px' }}>Add a <br />Report</motion.p>
                                            </Link>
                                        </td>

                                        <td>
                                            <motion.p
                                                // onClick={() => {
                                                //     reqSend.swalFireReq1("DELETE", 'admin/home', { id: patient.id },
                                                //         "Appointment Calceled", "Error While Cancelling", (response) => {
                                                //             setIsComponentChanged(!isComponentChanged)
                                                //         }, "Error! Check Your Connection");
                                                // }}
                                                whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status cancelled" style={{ color: '#B30021', fontSize: '15px', marginLeft: '10px' }}>Cancel <br />Request</motion.p>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

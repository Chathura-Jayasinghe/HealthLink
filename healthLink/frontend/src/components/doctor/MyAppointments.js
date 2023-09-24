import React, { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import pat1 from '../../assets/patients/patient1.jpg';
import pat2 from '../../assets/patients/patient2.jpg';
import pat3 from '../../assets/patients/patient3.jpg';
import pat4 from '../../assets/patients/patient4.jpg';
import pat5 from '../../assets/patients/patient5.jpg';
import pat6 from '../../assets/patients/patient6.jpg';



export default function MyAppointments(props) {
    const [patientData, setPatientData]= useState([]);
    const patientImages = [pat1, pat2, pat3, pat4, pat5, pat6];



    useEffect(() => {
        if (props.patientData) {
            setPatientData(props.patientData);
        }
    }, [props.patientData, patientData])


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
                            <tr style={{color:'balack'}}>
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
                                        <td>{index+1}</td>
                                        <td >
                                           <div className="d-flex">
                                           <img src={patientImages[index%patientImages.length]} />
                                            <p>{patient.user.name}</p>
                                           </div>
                                        </td>
                                        <td>{patient.user.email}</td>
                                        <td>{patient.date ? dateFormat(patient.date) : ''}</td>
                                        <td>{patient.time}</td>
                                        <td>
                                        <motion.p
                                                // onClick={() => {
                                                //     reqSend.swalFireReq1("DELETE", 'admin/home', { id: patient.id },
                                                //         "Appointment Calceled", "Error While Cancelling", (response) => {
                                                //             setIsComponentChanged(!isComponentChanged)
                                                //         }, "Error! Check Your Connection");
                                                // }}
                                                whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status delivered" style={{color:'#000',fontSize:'13px'}}>Add a Report</motion.p>
                                        </td>

                                        <td>
                                        <motion.p
                                                // onClick={() => {
                                                //     reqSend.swalFireReq1("DELETE", 'admin/home', { id: patient.id },
                                                //         "Appointment Calceled", "Error While Cancelling", (response) => {
                                                //             setIsComponentChanged(!isComponentChanged)
                                                //         }, "Error! Check Your Connection");
                                                // }}
                                                whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status cancelled" style={{color:'#B30021',fontSize:'13px'}}>Cancel Request</motion.p>
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


import '../styles/style.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


import * as reqSend from "../global/reqSender";
import { motion } from 'framer-motion';
import doc1 from '../assets/doctors/doctor1.jpg';
import doc2 from '../assets/doctors/doctor2.jpg';
import doc3 from '../assets/doctors/doctor3.jpg';
import doc4 from '../assets/doctors/doctor4.jpg';
import doc5 from '../assets/doctors/doctor5.jpg';
import doc6 from '../assets/doctors/doctor6.jpg';
const doctorImages = [doc1, doc2, doc3, doc4, doc5, doc6]


export default function MyAppointments() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState(null);
    const [isComponentChanged, setIsComponentChanged] = useState(false);



    useEffect(() => {
        reqSend.defaultReq("GET", 'appointment/', {}, (response) => {
            setAppointments(response.data.results)
        });
    }, [isComponentChanged])




    return (
        <>
            <div className="my-5 px-4">
                <h2 className="fw-bold h-font text-center">MY-APPOINTMENTS</h2>
                <div className="h-line bg-dark"></div>

            </div>

            <div className='d-flex justify-content-center mb-5'>
                <main className="table pt-5">

                    <section className="table__body">
                        <table>
                            <thead>
                                <tr>
                                    <th> Id </th>
                                    <th> Doctor </th>
                                    <th> Place </th>
                                    <th> Date </th>
                                    <th> Time </th>
                                    <th> Update </th>
                                    <th> Cancel </th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments && appointments.map((appointment, index) => {
                                    const date = new Date(appointment.date);
                                    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

                                   
                                    const formattedDate2 = date.toISOString().split('T')[0];

                                    const [hours, minutes] = appointment.time.split(":").map(Number);
                                    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;

                                    return (
                                        <motion.tr key={index}>
                                            <td> {index + 1} </td>
                                            <td> <img style={{ objectFit: 'cover' }} src={doctorImages[index % doctorImages.length]} alt="" />&nbsp;Dr.{appointment.doctor.name}</td>
                                            <td> {appointment.doctor.place} </td>
                                            <td> {formattedDate} </td>
                                            <td>
                                                {formattedTime}
                                            </td>
                                            <td> <motion.p
                                                onClick={() => {
                                                    navigate('/appointment', { state: { doctor: appointment.doctor, rating: 4, image: doctorImages[index % doctorImages.length], 
                                                        id: appointment.id, date: formattedDate2, time: appointment.time } });
                                                }}
                                                whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status pending">Change</motion.p></td>
                                            <td> <motion.p
                                                onClick={() => {
                                                    reqSend.swalFireReq1("DELETE", 'appointment', { id: appointment.id },
                                                        "Appointment Calceled", "Error While Cancelling", (response) => {
                                                            setIsComponentChanged(!isComponentChanged)
                                                        }, "Error! Check Your Connection");
                                                }}
                                                whileHover={{ scale: 1.2, cursor: 'pointer' }} transition={{ delay: 0, duration: 0.05 }} className="status cancelled">&nbsp;&nbsp;Calcel&nbsp;&nbsp;</motion.p></td>
                                        </motion.tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        </>
    )
}
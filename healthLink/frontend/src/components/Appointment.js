import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Rating from '@mui/material/Rating';
import { DoctorSectionDefault } from './sideComps/filterSections';
import * as reqSend from "../global/reqSender";
import Swal from "sweetalert2";
import PaymentGateway from './payment/PaymentGateway';

import doc1 from '../assets/doctors/doctor1.jpg';
import doc2 from '../assets/doctors/doctor2.jpg';
import doc3 from '../assets/doctors/doctor3.jpg';
import doc4 from '../assets/doctors/doctor4.jpg';
import doc5 from '../assets/doctors/doctor5.jpg';
import doc6 from '../assets/doctors/doctor6.jpg';



const doctorImages = [doc1, doc2, doc3, doc4, doc5, doc6]



export default function Appointment(props) {
    const location = useLocation();
    const [data, setData] = useState(null);
    const [doctorFilter, setDoctorFilter] = useState(null);

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [appId, setappId] = useState(null);

    const elementToScrollRef = useRef(null);

    const scrollToElement = () => {
        if (elementToScrollRef.current) {
            elementToScrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        setData(location.state);
        setDate(location.state.date);
        setTime(location.state.time);
        
        scrollToElement()
    }, [location.state])


    useEffect(() => {

        reqSend.defaultReq("POST", 'appointment/doctors', { name: "", date: "" }, (response) => {
            setDoctorFilter(response.data.results)
        });

    }, [])

    const placeAppointment = () => {
        if (data) {
            if(date && time){
                reqSend.swalFireReq1("POST", 'appointment/place', { doctorId: data.doctor.id, date: date, time: time, id: data.id }, 
                "Successfully Placed","This Time Slot Is Taken.Plese Select Different one",null,"Error"
                )
            }else{
                Swal.fire({ title: 'Error!', text: "Please Fill Date and Time.", icon: 'error', confirmButtonText: 'OK' })
            }
            
        }
    }


    return (
        <div id="scroolInto" className="container">
            <PaymentGateway placeAppointment={placeAppointment}/>
            <div className="card mb-4 border-0" >
                <div className="row">
                    <div className="my-3 px-4 mt-5" ref={elementToScrollRef}>
                        <h2 className="fw-bold h-font text-center">Dr.{data ? data.doctor.name : ""}  <Rating name="half-rating-read" value={data ? data.rating : 0} precision={0.5} readOnly /></h2>
                    </div>
                </div>

                <div className="row g-0 p-3 align-item-center">
                    <div className="col-md-6  mb-lg-0 mb-md-0 mb-3">

                        <img style={{ height: '100%', width: '100%', objectFit: 'cover' }} src={data ? data.image : ""} className="img-fluid rounded-start" alt="..." />

                    </div>
                    <div className="col-md-6 px-lg-5 px-md-3 px-0 ">

                        <div>
                            <div className="my-3">
                                <h4 className="mb-1 ">Email:&nbsp; {data ? data.doctor.email : ""}</h4>
                            </div>
                            <div className="my-3">
                                <h4 className="mb-1">Place:&nbsp;{data ? data.doctor.place : ""} </h4>
                            </div>

                        </div>

                        <div className="row boxShadow1" >
                            <div className="col-lg-12 bg-white  p-4">
                                <h4 id="availableLable" style={{ textAlign: 'center', color: 'red' }}></h4>
                                <div className="row align-items-end">
                                    <div className="col-lg-6 mb-3">
                                        <label className="form-label" style={{ fontWeight: '500' }} >Date</label>
                                        <input value={date} onChange={(e) => { setDate(e.target.value) }} id="checkInDate" type="date" className="form-control shadow-none"
                                        />
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label className="form-label" style={{ fontWeight: '500' }}>Time</label>
                                        <input value={time} onChange={(e) => { setTime(e.target.value) }} id="time" type="time" className="form-control shadow-none" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 bg-white  p-4">

                                <div className="border bg-light p-3 mb-3 m-auto text-center">
                                    <p id="errorLog" style={{ color: 'red' }}></p>
                                    <button className="btn text-white shadow-none custom-bg"
                                    data-toggle="modal" data-target="#staticBackdrop"
                                    >Place Appointment</button>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>


            <div className='mt-5 pt-4'>
                <DoctorSectionDefault  doctorFilter={doctorFilter} text={"Recommended For You"} setLoginPop={props.setLoginPop} />
            </div>
        </div>
    )
}
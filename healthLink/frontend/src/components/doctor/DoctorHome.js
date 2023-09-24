import React from 'react';
import { Route, Routes,Link } from 'react-router-dom';
import '../../styles/dashboard.css';


export default function DoctorHome(props) {
    const counts = '0';

  return (
    <main>
            <div className="head-title">
                <div className="left">
                    <h1>Dashboard</h1>
                </div>
                {/* <Link to="/admin/add-doctors" className="btn-download">
                    <i className='bx bxs-user-plus'></i>
                    <span className="text">Add Doctors</span>
                </Link> */}
            </div>

            <ul className="box-info" style={{ paddingLeft: '0' }}>
                <li className="boxShadow1">
                    <i className='bx bxs-calendar-check' ></i>
                    <span className="text">
                    
                        <h3>{props.totalAppoint}</h3>
                        <p>Total Appointments</p>
                    </span>
                </li>
                <li className="boxShadow1">
                    <i className='bx bxs-group' ></i>
                    <span className="text">
                        <h3>{counts[1]}</h3>
                        <p>Total Patients</p>
                    </span>
                </li>
                <li className="boxShadow1">
                    <i className='bx bxs-dollar-circle' ></i>
                    <span className="text">
                        <h3>{counts[2]}</h3>
                        <p>Current Appointments</p>
                    </span>
                </li>
            </ul>
        </main>
  )
}

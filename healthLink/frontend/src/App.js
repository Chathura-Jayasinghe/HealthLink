

import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Doctors from './components/Doctors';
import Contact from './components/Contact';
import Appointment from './components/Appointment';
import MyAppointments from './components/MyAppointments';
import Footer from './components/Footer';

import Login from './components/admin/login';
import DoctorLogin from './components/doctor/login';
import Dashboard from './components/admin/dashboard';
import DoctorDashboard from './components/doctor/dashboard';
import MyReports from './components/MyReports';

function App() {
    const [loginPop, setLoginPop] = useState(false);

    return (
        <div className="App">
            <React.Fragment>
                <Routes>
                    <Route path="/admin/*" element={
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/*" element={<Dashboard />} />

                        </Routes>
                    } />

                    <Route path="/doctor/*" element={
                        <Routes>
                            <Route path="/login" element={<DoctorLogin />} />
                            <Route path="/*" element={<DoctorDashboard />} />

                        </Routes>
                    } />


                    <Route path="/*" element={
                        <>
                            <div>
                                <NavBar loginPop={loginPop} setLoginPop={setLoginPop} />
                                <Routes>
                                    <Route path="/" element={<Home setLoginPop={setLoginPop} />} />
                                    <Route path="/doctors" element={<Doctors setLoginPop={setLoginPop} />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/appointment" element={<Appointment setLoginPop={setLoginPop} />} />
                                    <Route path="/my-appointments" element={<MyAppointments setLoginPop={setLoginPop} />} />
                                    <Route path="/my-reports" element={<MyReports setLoginPop={setLoginPop} /> } />
                                </Routes>
                                <Footer />
                            </div>
                        </>

                    } />
                </Routes>
            </React.Fragment>
        </div >
    );
}

export default App;

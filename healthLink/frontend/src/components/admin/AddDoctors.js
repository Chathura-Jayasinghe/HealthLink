import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

import * as reqSend from "../../global/reqSender";
import Swal from "sweetalert2";


export default function AddDoctors(props) {



    const [doctorInfo, setDoctorInfo] = useState({
        name: '',
        email: '',
        workingPlace: '',
        phoneNumber: '',
        specialization: doctorSpecializations[0],
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;
        setDoctorInfo({ ...doctorInfo, [name]: value });
    };

    const handleSpecializationChange = (_, value) => {
        setDoctorInfo({ ...doctorInfo, specialization: value });
    };

    const handelSubmit = (event) => {
        event.preventDefault();
        // console.log(doctorInfo)
        const submitData = {
            name: doctorInfo.name,
            email: doctorInfo.email,
            phone: doctorInfo.phoneNumber,
            place: doctorInfo.workingPlace,
            specialize: doctorInfo.specialization.label,
            password: doctorInfo.password

        }
        // swalFireReq1(method,url,data,swal1=null,swal2=null,callback1=null,swal3=null)
        reqSend.defaultReq("POST", 'admin/add-doctor', submitData, responce => {
            Swal.fire({ title: 'Success!', text: "Doctor Added Successfully", icon: 'success', confirmButtonText: 'OK' })
        },
            responce => {
                Swal.fire({ title: 'Error!', text: responce.data.message, icon: 'error', confirmButtonText: 'OK' })
            },
            responce => {
                Swal.fire({ title: 'Error!', text: "Something went Wrong", icon: 'error', confirmButtonText: 'OK' })
            }
        );


    }


    return (
        <main>
            <div className="head-title">
                <div className="left">
                    <h1>Add Doctors</h1>
                </div>

            </div>

            <div className="table-data " >
                <div className="order boxShadow1 " >
                    <div className="d-flex justify-content-center">
                        <h3 style={{ textAlign: 'center' }}>Add a Doctor</h3>
                    </div>

                    <div className='container mt-4'>
                        <form onSubmit={handelSubmit}>
                            <div className="row my-3">
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' required onChange={handleChange} name="name" label="Name" variant="outlined" fullWidth />
                                </div>
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' required onChange={handleChange} name="email" value={doctorInfo.email} label="Email" variant="outlined" fullWidth />
                                </div>
                            </div>

                            <div className='row my-3'>
                                <div className='col colmd-6'>
                                    <TextField className='darkThemeText' required onChange={handleChange} name="workingPlace" value={doctorInfo.workingPlace} label="Working Place" variant="outlined" fullWidth />
                                </div>
                                <div className='col colmd-6'>
                                    <TextField className='darkThemeText' required onChange={handleChange} name="phoneNumber" value={doctorInfo.phoneNumber} label="Phone number" variant="outlined" fullWidth />
                                </div>
                            </div>

                            <div className='row my-3'>
                                <div className='col col-md-6 '>

                                    <Autocomplete
                                    className='darkThemeText'
                                        name="specialization"
                                        value={doctorInfo.specialization}
                                        onChange={handleSpecializationChange}
                                        style={{ width: '100%' }}
                                        disablePortal
                                        id="combo-box-demo"
                                        options={doctorSpecializations}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField className='darkThemeText' {...params} label="Specialize Field" fullWidth required />}
                                        required
                                    />
                                </div>
                            </div>


                            <div className='row my-3'>
                                <div className='col col-md-6'>
                                    <TextField className='darkThemeText' required onChange={handleChange} value={doctorInfo.password} name="password" type='password' label="Password" variant="outlined" fullWidth />
                                </div>

                            </div>

                            <div className='row justify-content-center my-5'>
                                <button
                                    type='submit'

                                    className='btn btn-md btn-primary' style={{ borderRadius: '50px', maxWidth: '250px' }}>Add Doctor</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    )
}



const doctorSpecializations = [
    { label: 'Common' },
    { label: 'Brain-Cerebellum' },
    { label: 'Brain-Cerebrum' },
    { label: 'Eye-Retina' },
    { label: 'Eye-Cornea' },
    { label: 'Eye-Lens' },
    { label: 'Heart-Aorta' },
    { label: 'Heart-Valves' },
    { label: 'Heart-Chambers' },
    { label: 'Kidney' },
    { label: 'Liver' },
    { label: 'Bone' },
    { label: 'Skin' },
    { label: 'Stomach' },
    { label: 'Intestine' },
    { label: 'Ear' },
    { label: 'Nose' },
    { label: 'Throat' },
    { label: 'Spine' },
    { label: 'Muscle' },
    { label: 'Joint' },
    { label: 'Bladder' },
    { label: 'Pancreas' },
    // Add more body parts and their combined subparts as needed
];
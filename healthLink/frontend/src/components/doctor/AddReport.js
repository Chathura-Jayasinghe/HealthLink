import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { FormControl, Radio, RadioGroup, FormControlLabel, FormLabel  } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';


import * as reqSend from "../../global/reqSender";
import Swal from "sweetalert2";


export default function AddReport(props) {
    const [rating, setRating] = useState(''); // Initialize with an empty string
    const location = useLocation();
    console.log(location);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
      };
      

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
                    <h1>Add a Report</h1>
                </div>

            </div>

            <div className="table-data " >
                <div className="order boxShadow1 " >
                    <div className="d-flex justify-content-center">
                        <h3 style={{ textAlign: 'center' }}></h3>
                    </div>

                    <div className='container mt-4'>
                        <form onSubmit={handelSubmit}>
                            <div className="row my-3">
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' required onChange={handleChange} name="Patient-name" label="Patient Name" variant="outlined" fullWidth />
                                </div>
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' required onChange={handleChange} name="doctor-name" value={doctorInfo.email} label="Doctor Name" variant="outlined" fullWidth />
                                </div>
                            </div>

                            <div className='row my-3'>
                                <div className="col col-md-6">
                                    <TextField className='darkThemeText' required onChange={handleChange} name="Disease" value={doctorInfo.email} label="Disease" variant="outlined" fullWidth />
                                </div>

                                <div className='col col-md-6'>
                                    <FormControl component="fieldset">
                                    <FormLabel component="legend">Condition of the Disease</FormLabel>

                                    <RadioGroup
                                        aria-label="Condition Rating"
                                        name="conditionRating"
                                        value={rating}
                                        onChange={handleRatingChange}   
                                        row
                                    >
                                        <FormControlLabel
                                        value="low"
                                        control={<Radio />}
                                        label="Low"
                                        />
                                        <FormControlLabel
                                        value="medium"
                                        control={<Radio />}
                                        label="Medium"
                                        />
                                        <FormControlLabel
                                        value="high"
                                        control={<Radio />}
                                        label="High"
                                        />
                                    </RadioGroup>
                                    </FormControl>
                                </div>
                            </div>



                            <div className='row my-3'>
                                <div className='col col-md-12'>
                                <FormControl fullWidth>
                                    <FormLabel>Description</FormLabel>
                                    <ReactQuill
                                        style={{height: '150px', marginBottom: '20px'}}
                                        placeholder="Type here..."
                                        modules={{
                                            toolbar: {
                                            container: [
                                                ['bold', 'italic', 'underline', 'strike'],
                                                [{ 'script': 'sub' }, { 'script': 'super' }],
                                                ['link', 'image', 'video'],
                                                ['blockquote', 'code-block'],
                                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                                [{ 'indent': '-1'}, { 'indent': '+1' }],
                                                [{ 'align': [] }],
                                                ['clean'],
                                            ],
                                            },
                                        }}
                                        />
                                    </FormControl>
                                </div>
                            </div>

                            <div className='row justify-content-center my-5'>
                                <button
                                    type='submit'

                                    className='btn btn-md btn-primary' style={{ borderRadius: '50px', maxWidth: '250px' }}>Add Report</button>
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
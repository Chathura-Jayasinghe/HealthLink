import React from "react";
import Circle from 'react-circle';
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { motion } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import axios from "axios";
import { DoctorSectionDefault } from './sideComps/filterSections';
import * as reqSend from "../global/reqSender";


const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, })


function MriScan(props) {

    const className = 'p-16 mt-10';

    useEffect(() => {

        reqSend.defaultReq("POST", 'appointment/doctors', { name: "", date: "" }, (response) => {
            setDoctorFilter(response.data.results)
        });

    }, [])


    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [files, setFiles] = useState([])
    const [mriResults, setMriResults] = useState([])
    const [count, setCount] = useState(0)
    const [doctorFilter, setDoctorFilter] = useState(null);



    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file), id: uuidv4() })
                )
            ])
        }

        if (rejectedFiles?.length) {
            Toast.fire({ icon: 'error', title: "We only Accept Imgage Types" })
        }
    }, [])


    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        maxSize: 1024 * 1024 * 500,
        onDrop
    })

    useEffect((props) => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])



    const handelUpload = async () => {

        if (files?.length) {
            setUploading(true);
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('files', file);
            });

            try {
                setMriResults([])
                const response = await axios.post('http://127.0.0.1:5000/image-upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = (progressEvent.loaded / progressEvent.total) * 100;
                        setUploadProgress(progress);
                    },
                });


                if (response.status === 200 || response.status === 201) {

                    setTimeout(() => {
                        Toast.fire({ icon: 'success', title: "Successfully Saved" });
                        uploadReset()
                        setMriResults(response.data)
                    }, 2000);

                } else {
                    setTimeout(() => {
                        Toast.fire({ icon: 'error', title: "Uploading Failed" });
                        uploadReset()
                    }, 1000);
                }
            } catch (error) {
                uploadReset()
                Toast.fire({ icon: 'error', title: "Something went wrong. File is not Uploaded" })
            }
        } else {
            Toast.fire({ icon: 'error', title: "Nothing to Upload. " });
        }

    }

    const uploadReset = () => {
        setUploadProgress(0);
        setUploading(false);
        setMriResults([])
    }


    // const handleDownload = (imageData, name) => {
    //     const byteCharacters = atob(imageData);
    //     const byteNumbers = new Array(byteCharacters.length);
    //     for (let i = 0; i < byteCharacters.length; i++) {
    //         byteNumbers[i] = byteCharacters.charCodeAt(i);
    //     }
    //     const byteArray = new Uint8Array(byteNumbers);
    //     const blob = new Blob([byteArray], { type: 'image/png' });

    //     const url = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = name // Set the desired file name
    //     document.body.appendChild(a);
    //     a.click();
    //     window.URL.revokeObjectURL(url);
    // };



    return (
        <>
            <div className="my-5 px-4">
                <h2 className="fw-bold h-font text-center">MRI SCAN PREDICTION</h2>
                <div className="h-line bg-dark"></div>
            </div>
            <div className="mb-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px' }}>
                <motion.button onClick={handelUpload} whileHover={{ scale: 1.1 }} className="btn  btn-lg btn-primary px-5 py-2 mx-2" style={{ borderRadius: '50px' }}>Scan MRI</motion.button>
                <motion.button onClick={() => { setFiles([]); uploadReset() }} whileHover={{ scale: 1.1 }} className="btn  btn-lg btn-danger px-5 py-2 mx-2" style={{ borderRadius: '50px' }}>&nbsp;&nbsp;Remove&nbsp;&nbsp;</motion.button>
            </div>
            <div className='container my-5 '>

                <div style={{ position: 'relative' }} className="my-4">

                    <div className="table-data " >



                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px' }}
                            className="order boxShadow1">


                            {
                                (uploading) ?
                                    <div style={{ left: '0', top: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px', zIndex: '10', height: '100%', width: '100%', position: 'absolute', backgroundColor: 'rgb(0 0 0 / 73%)' }}>
                                        <div style={{ color: 'white' }}>

                                            <div className="row">
                                                <Circle
                                                    animate={true} animationDuration="1s" responsive={false}
                                                    size="180" lineWidth="50" progress={parseInt(uploadProgress)}
                                                    progressColor="rgb(50 255 10)" bgColor="#ecedf0" textColor="rgb(50 255 10)"
                                                    textStyle={{
                                                        font: 'bold 4rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                                                    }}
                                                    percentSpacing={10} roundedStroke={true} showPercentage={true}
                                                    showPercentageSymbol={true}
                                                />
                                            </div>
                                            <br />
                                            <h5 className="mt-2">Please wait while Scanning...</h5>
                                        </div>
                                    </div> :
                                    null

                            }

                            {files.length == 0 ?
                                <motion.div

                                    style={{ marginTop: '40px', marginBottom: '40px' }}
                                    {...getRootProps({

                                        className: className
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }} className='gap-4 dotterBoarder p-3 my-2'>
                                        <div>

                                            <label
                                                style={{
                                                    display: 'inline-block', padding: '20px 20px', backgroundColor: '#17A2B8', color: 'white', borderRadius: '100px', cursor: 'pointer',
                                                }}
                                            >
                                                <CloudUploadIcon style={{ fontSize: '6rem' }} />

                                            </label>

                                            <span style={{ marginLeft: '10px' }}>Drag & drop files here(Only Images)</span>
                                        </div>
                                    </div>
                                </motion.div>
                                : <>
                                    {(mriResults.length > 0) ?

                                        (
                                            (mriResults[0].mask === 1) ?

                                                <img style={{ height: '80vh', maxWidth: '80%', objectFit: 'cover' }}
                                                    src={`data:image/png;base64,${mriResults[0].image}`}
                                                /> : <>
                                                   <div>
                                                   <h5 style={{ textAlign: 'center',color:'green' }}>We are pleased to inform you that we could not find any brain tumors in your MRI scans.
                                                    </h5><br/><h3 style={{ textAlign: 'center',color:'green' }}>This is wonderful news!</h3>
                                                   </div>
                                </>
                                        )
                            : <img style={{ height: '80vh', maxWidth: '80%', objectFit: 'cover' }}
                                src={files[0].preview}
                            />
                                    }

                        </>
                            }
                    </motion.div>
                </div>

            </div>
        </div >


        <div className='mt-5 pt-4'>
                <DoctorSectionDefault doctorFilter={doctorFilter} text={"Recommended For You"} setLoginPop={props.setLoginPop} />
            </div>

        </>
    )

}


export default MriScan;
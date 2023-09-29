import React from "react";
import Circle from 'react-circle';
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { motion } from "framer-motion";


import Tooltip from '@mui/material/Tooltip';
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import axios from "axios";



const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, })




export default function MRI(props) {

    const className = 'p-16 mt-10';

    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [files, setFiles] = useState([])
    const [mriResults, setMriResults] = useState([])
    const [count, setCount] = useState(0)



    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
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
        // noClick: true,
        multiple: true,
        accept: {
            'image/*': []
        },
        maxSize: 1024 * 1024 * 500,
        onDrop
    })

    useEffect((props) => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])

    const removeFile = id => {
        setFiles(files => files.filter(file => file.id !== id))
    }

    // const removeAll = () => {
    //     setFiles([])
    // }




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
                        setFiles([])
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
    }


    const handleDownload = (imageData, name) => {
        const byteCharacters = atob(imageData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name // Set the desired file name
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };






    useEffect((props) => {
        setCount(
            mriResults.reduce((accumulator, currentValue) => {
                if (currentValue.mask === 1) {
                    return accumulator + 1;
                } else {
                    return accumulator;
                }
            }, 0)
        )
    }, [mriResults])

    return (<main>
        <div className="head-title">
            <div className="left">
                <h1>Scan MRI</h1>
            </div>

        </div>

        <div className="d-flex justify-content-end">
            <motion.button
                onClick={handelUpload}
                whileHover={{ scale: 1.2 }} className="btn-scan">
                Scan MRI
            </motion.button>
        </div>


        <div style={{ position: 'relative' }} className="my-4">
            <div className="table-data " >
                <div className="order boxShadow1">
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
                            </div> : null
                    }

                    <div
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
                                    <CloudUploadIcon style={{ fontSize: '4rem' }} />

                                </label>

                                <span style={{ marginLeft: '10px' }}>Drag & drop files here(Only Images)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <>
                <div className='col  m-2 mx-0' style={{ maxHeight: '500px', overflowY: 'scroll' }} >

                    <div className="container mt-3 d-flex justify-content-center" >
                        <div>
                            {files.map((file, index) => {
                                return (
                                    <div key={"file" + index} className="mx-2" style={{ display: 'inline-block' }} >
                                        <Tooltip title={file.name} arrow>
                                            <motion.div className="mt-3 mx-1" whileHover={{ scale: 1.05 }} style={{ position: 'relative', maxWidth: '300px' }}>
                                                <motion.div
                                                    onClick={() => removeFile(file.id)}
                                                    whileHover={{ scale: 1.3 }} className="p-1" style={{ zIndex: 5, borderRadius: '50px', backgroundColor: 'red', position: 'absolute', right: '-1%', top: '-5%' }}>
                                                    <i className="fa fa-times m-0 px-1 " style={{ color: 'white', fontSize: '30px' }} aria-hidden="true"></i>
                                                </motion.div>

                                                <motion.div
                                                    className="p-1" whileHover={{ opacity: 1 }} initial={{ opacity: 0 }} style={{ width: '100%', height: '100%', backgroundColor: '#ffffffab', position: 'absolute', left: '0', top: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <motion.i
                                                        onClick={() => {

                                                            const url = file.preview
                                                            fetch(url).then(res => res.blob()).then(blob => {
                                                                const blobUrl = window.URL.createObjectURL(new Blob([blob]))
                                                                const link = document.createElement('a');
                                                                link.href = blobUrl
                                                                link.download = file.name;
                                                                link.style.display = 'none';
                                                                document.body.appendChild(link);
                                                                link.click();
                                                                link.remove();
                                                            })

                                                        }}

                                                        whileHover={{ scale: 1.3 }} className="fa fa-download m-0 " style={{ color: '#1D1354', fontSize: '20px' }} aria-hidden="true"></motion.i>
                                                </motion.div>

                                                <img style={{ height: 'auto', maxWidth: '100%' }}
                                                    src={file.preview}
                                                    alt={file.name}
                                                />
                                                <p style={{ fontSize: '12px' }}>
                                                    {(() => {
                                                        if (file.name.length > 32) {
                                                            return file.name.slice(0, 30) + '..'
                                                        }
                                                        return file.name;
                                                    })()}
                                                </p>
                                            </motion.div>
                                        </Tooltip>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        </div>

        {(mriResults.length > 0) ?
            <>
                <h2 className="pb-3" style={{ textAlign: 'center' }}>Scanning MRI Results</h2>
                <p style={{ fontSize: '20px' }}>We found <strong style={{ color: "red" }}>{count} MRI scans(s)with brain tumors</strong> and <strong style={{ color: 'green' }}>{mriResults.length - count} healthy MRI scan(s)</strong>.</p>

                <div className="table-data">
                    <div className="boxShadow1 px-4 py-4 mt-3" style={{ borderRadius: '10px', width: '100%' }}>
                        <h3>Detected Brain Tumors</h3>


                        <div style={{ position: 'relative' }} className="my-4">
                            <>
                                <div className='col  m-2 mx-0' style={{ maxHeight: '500px', overflowY: 'scroll' }} >

                                    <div className="container mt-3 d-flex justify-content-center" >
                                        <div>
                                            {mriResults.map((file, index) => {
                                               if(file.mask===1){
                                                return (
                                                    <div key={"file" + index} className="mx-2" style={{ display: 'inline-block' }} >
                                                        <Tooltip title={file.name} arrow>
                                                            <motion.div className="mt-3 mx-1" whileHover={{ scale: 1.05 }} style={{ position: 'relative', maxWidth: '300px' }}>
                                                                <motion.div
                                                                    className="p-1" whileHover={{ opacity: 1 }} initial={{ opacity: 0 }} style={{ width: '100%', height: '100%', backgroundColor: '#ffffffab', position: 'absolute', left: '0', top: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <motion.i
                                                                        onClick={() => { handleDownload(file.image, file.name) }}
                                                                        whileHover={{ scale: 1.3 }} className="fa fa-download m-0 " style={{ color: '#1D1354', fontSize: '20px' }} aria-hidden="true"></motion.i>
                                                                </motion.div>

                                                                <img style={{ height: 'auto', maxWidth: '100%' }}
                                                                    src={`data:image/png;base64,${file.image}`}
                                                                    alt={file.name}
                                                                />
                                                                <p style={{ fontSize: '12px' }}>
                                                                    {(() => {
                                                                        if (file.name.length > 32) {
                                                                            return file.name.slice(0, 30) + '..'
                                                                        }
                                                                        return file.name;
                                                                    })()}
                                                                </p>
                                                            </motion.div>
                                                        </Tooltip>
                                                    </div>
                                                )
                                               }
                                              
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>



                    </div>
                </div>




            </>
            : null
        }


    </main>

    )
}
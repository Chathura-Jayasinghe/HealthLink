import React from 'react';
import './PaymentGateway.css';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';

export default function PaymentGateway() {
    return (
        <div>
            <button type="button" class="btn btn-primary gateway-launch" data-toggle="modal" data-target="#staticBackdrop"> <i class="fa fa-rocket"></i> Pay Now</button>

            <div className="modal fade payment-body" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
               
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">

                            <div className="text-right">
                                <i className="fa fa-close close" data-dismiss="modal"></i>
                            </div>
                            <div className="tabs mt-3">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link active"  id="mspace-tab" data-toggle="tab" href="#mspace" role="tab" aria-controls="mspace" aria-selected="true">
                                            <img src="https://user.mspace.lk/registration-api/api/v3/public/mobitel/icons/company-logo-white.png" width="80" alt="mspace" />
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="visa-tab" data-toggle="tab" href="#visa" role="tab" aria-controls="visa" aria-selected="false">
                                            <img src="https://i.imgur.com/sB4jftM.png" width="80" alt="Visa" />
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="mspace" role="tabpanel" aria-labelledby="mspace-tab">
                                        <div className="px-5 mt-3">
                                            <div className="text-center">
                                                <h5>Caas Payment</h5>
                                            </div>
                                            <div className="inputbox mt-4">
                                                <TextField
                                                    label="Your Mobitel Number"
                                                    variant="outlined"
                                                    fullWidth
                                                    required
                                                    defaultValue="0704934655"
                                                />
                                            </div>
                                            <div className="pay px-5 mt-4">
                                                <button className="btn btn-success btn-block">Pay Now</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="visa" role="tabpanel" aria-labelledby="visa-tab">
                                        <div className="mt-4 mx-4">
                                            <div className="text-center">
                                                <h5>Credit card</h5>
                                            </div>
                                            <div className="form mt-3">
                                                <div className="inputbox">
                                                    <TextField
                                                        label="Cardholder Name"
                                                        variant="outlined"
                                                        fullWidth
                                                        required
                                                    />
                                                </div>
                                                <div className="inputbox mt-3">
                                                    <TextField
                                                        label="Card Number"
                                                        variant="outlined"
                                                        fullWidth
                                                        required
                                                        inputProps={{ min: 1, max: 999 }} // Use inputProps for min and max
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <IconButton>
                                                                        <Visibility /> {/* You can toggle visibility here */}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </div>
                                                <div className="d-flex flex-row mt-3">
                                                    <div style={{marginRight: '10px'}}>
                                                        <TextField
                                                            label="Expiration Date"
                                                            variant="outlined"
                                                            fullWidth
                                                            required
                                                            inputProps={{ min: 1, max: 999 }} // Use inputProps for min and max
                                                        />
                                                    </div>
                                                    <div className="inputbox">
                                                        <TextField
                                                            label="CVV"
                                                            variant="outlined"
                                                            fullWidth
                                                            required
                                                            inputProps={{ min: 1, max: 999 }} // Use inputProps for min and max
                                                        />
                                                    </div>
                                                </div>
                                                <div className="px-5 pay mt-4">
                                                    <button className="btn btn-primary btn-block">Pay Now</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

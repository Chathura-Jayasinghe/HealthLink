const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const userRoute = require('./routes/user');
const appointmentRoute = require('./routes/appointment');
const adminDashboardRoute = require('./routes/adminDashboard');


const axios = require("axios");



app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRoute);
app.use("/appointment", appointmentRoute);
app.use("/admin", adminDashboardRoute);

module.exports = app;

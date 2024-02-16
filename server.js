const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to DataBase
connectDB();

// Route Files
const mailing = require('./routes/mailing');

const app = express();

// Body parser
app.use(express.json());

const router = express.Router();

// Mount routers
app.use('/api/v1/mailing', mailing);

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));


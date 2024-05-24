const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
;
const app = express();

app.use(cors({origin: 'http://localhost:3000',credentials:true}));
app.options('*', cors()) 

// require('dotenv').config();
// console.log("dotenv");
// console.log(process.env);
//Connect Database
connectDB();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Init Middleware
app.use(express.json({ extended: false }));

app.use(express.urlencoded({ extended: true }));

// app.use(express.static('public'));

app.get('/', (req, res) => res.send('API Running'));

app.use('/auth', require('./routes/auth'));
app.use('/create-employee', require('./routes/createEmp'));
app.use('/attendance', require('./routes/postAttendance'));
app.use('/get-attendance', require('./routes/getAttendance'));
// app.use('/dashboard', require('./routes/dashboard'));
// app.use('/api/auth', require('./routes/api/auth'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

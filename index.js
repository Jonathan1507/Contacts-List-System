// We import all environment variables.
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// We import the connection for the DB.
const {connectionDB} = require('./database/config');

// Create the Express Server
const app = express();

//============================================================
//================ CORS configuration ====================
//============================================================
app.use(cors());


app.use(express.json());

//============================================================
//=================== Call to the DB ========================
//============================================================
connectionDB();

//============================================================
//======================== Routes =============================
//============================================================
app.use('/api/users', require('./routes/user'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/full', require('./routes/search'));

//============================================================
//================= Server Execution ====================
//============================================================
app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT)
});

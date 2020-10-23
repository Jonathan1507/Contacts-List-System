// We import all environment variables.
require('dotenv').config();

const express = require('express');

// We import the connection for the DB.
const {connectionDB} = require('./database/config');

// Create the Express Server
const app = express();

//============================================================
//================ CORS configuration ====================
//============================================================

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

//============================================================
//================= Ejecución de Servidor ====================
//============================================================
app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT)
});

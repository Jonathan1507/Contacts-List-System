const mongoose = require('mongoose');
// We import all environment variables.
require('dotenv').config();

const connectionDB = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    console.log('Online Database')
    } catch (err) {
        console.log(err);
        throw new Error('Error starting the Database')
    }
}

module.exports = {
    connectionDB
}
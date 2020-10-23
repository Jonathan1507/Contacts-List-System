const jwt = require('jsonwebtoken');
const { Promise } = require('mongoose');
// Importamos todas las variables de entorno.
require('dotenv').config();

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {
                uid
            };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT')
            }else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}
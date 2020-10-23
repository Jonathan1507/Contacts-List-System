const {response} = require('express');
// We import the "userModel" model
const User = require('../model/userModel')
// We import "Bcryptjs" to encrypt passwords in one way.
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const {email, password} = req.body;

    try {

        const userDB = await User.findOne({email});

        // Verify email
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email is not valid'
            });
        }

        // Verify password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is not valid'
            });
        };

        // Generar el TOKEN -JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok :false,
            msg: 'Contact the administrator'
        })
    }
}

const renewToken = async(req, res = response) => {
    const uid = req.uid;

    // Generar el TOKEN -JWT
    const token = await generateJWT(uid);

    // Obtener el usuario por UID
    const user = await User.findById(uid);

    res.json({
        ok: true,
        token,
        user
    })
}

module.exports = {
    login,
    renewToken
}

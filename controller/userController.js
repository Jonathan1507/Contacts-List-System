const {response} = require('express');

const bcrypt = require('bcryptjs');
const User = require('../model/userModel');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {
    const {email, password} = req.body;

    try {
        const existsEmail = await User.findOne({email});
        if (existsEmail) {
            return res.status(400).json({
                ok:false,
                msg: 'The email is already registered'
            });
        };
        const user = new User(req.body);

        // Encrypt password (one-way).
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Save user
        await user.save();

        // Generate the TOKEN -JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok:false,
            msg: 'Unexpected error ... check logs'
        })
    }
}

const updateUser = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok:false,
                msg: 'There is no user for that ID'
            });
        }

        // Actualizaciónes.
        const {password, email, ...fields} = req.body;

        if (userDB.email !== email) {

            const existsEmail = await User.findOne({email});
            if (existsEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'There is already a user with that email'
                });
            }
        }
        // delete campos.contrasenia;
        fields.email = email;
        const userupdated = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok:true,
            user: userupdated
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

module.exports = {
    createUser,
    updateUser,
}

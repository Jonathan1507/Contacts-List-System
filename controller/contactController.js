const {response} = require('express');

// Importamos el modelo de "medico"
const Contact = require('../model/contactModel');
const { body } = require('express-validator');

//============================================================
//==================== List of Contact =======================
//============================================================
const listContact = async(req, res = response) => {

    const from = Number(req.query.from) || 0;
    const [contacts, total] = await Promise.all([
        Contact 
            .find({}, 'name surnames email phone')
            .populate('user','name email')
            .skip(from)
            .limit(10),

        Contact.countDocuments()
    ]);

    res.json({
        ok: true,
        contacts,
        total
    })
}

//============================================================
//======================= Create Contact =====================
//============================================================
const createContact = async(req, res = response) => {
    const uid = req.uid;
    const contact = new Contact({
        user: uid,
        ...req.body
    });

    try {
        const contactDB = await contact.save();

        res.json({
            ok: true,
            contact: contactDB
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }
}

//============================================================
//==================== Update Contact ========================
//============================================================
const updateContact = async(req, res = response) => {
    const contactID = req.params.id;
    const uid = req.uid;

    try {
        const contactDB = await Contact.findById(contactID);

        if (!contactDB) {
        return res.status(404).json({
            ok: true,
            msg: 'Contact not found by ID'
        });
        }

      // We update all the fields.
        const contactChanges = {
        ...req.body,
        user: uid
        }

    const updatedContact = await Contact.findByIdAndUpdate(contactID, contactChanges, {new: true});

    res.json({
        ok: true,
        contact: updatedContact
    })

    } catch (e) {
        console.log(e);
        res.status(500).json({
        ok: false,
        msg: 'Contact the administrator'
        })
    }
}

//============================================================
//===================== Delete Contact =======================
//============================================================
const deleteContact = async(req, res = response) => {
    const contactID = req.params.id;

    try {
    const contactDB = await Contact.findById(contactID);

    if (!contactDB) {
        return res.status(404).json({
            ok: true,
            msg: 'Contact not found by ID'
        });
    }

    await Contact.findByIdAndDelete(contactID);

    res.json({
        ok: true,
        msg: 'Contact removed successfully'
    })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }
}


module.exports = {
    listContact,
    createContact,
    updateContact,
    deleteContact
}

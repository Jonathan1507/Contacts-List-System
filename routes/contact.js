/**
    Route => /api/contact
 */
const {Router} = require('express');
const {check} = require('express-validator');

// We import "validate fields" => This is a custom Middleware.
const {validateFields} = require('../middlewares/validate-fields');

// We import the 'Users' controller.
const {listContact, createContact, updateContact, deleteContact} = require('../controller/contactController');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router();

//============================================================
//==================== List Contacts ====================
//============================================================
router.get('/', listContact);

//============================================================
//====================== Create User =======================
//============================================================
router.post('/',
    [
        // Here a custom validation is done with "expres-validator",
        // Only to the fields that are required
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        check('surnames', 'Surnames is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('phone', 'Phone is required').not().isEmpty(),
        validateFields
    ], 
    createContact);

//============================================================
//==================== Update User ====================
//============================================================
router.put('/:id', 
    [
        validateJWT,
        // Here a custom validation is done with "expres-validator",
        // Only to the fields that are required
        check('name', 'The name is required').not().isEmpty(),
        check('surnames', 'Paternal surnames is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('phone', 'The password is required').not().isEmpty(),
        validateFields
    ],
    updateContact);

//============================================================
//===================== Delete Contact ======================
//============================================================
router.delete('/:id', deleteContact);

module.exports = router;
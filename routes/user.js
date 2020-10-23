/**
    Route => /api/user
 */
const {Router} = require('express');
const {check} = require('express-validator');

// We import "validate fields" => This is a custom Middleware.
const {validateFields} = require('../middlewares/validate-fields');

// We import the 'Users' controller.
const {createUser, updateUser} = require('../controller/userController');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router();


//============================================================
//====================== Create User =======================
//============================================================
router.post('/',
    [
        // Here a custom validation is done with "expres-validator",
        // Only to the fields that are required
        check('name', 'The name is required').not().isEmpty(),
        check('surnames', 'Paternal surnames is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        validateFields
    ], 
    createUser);

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
        validateFields
    ],
    updateUser);

module.exports = router;
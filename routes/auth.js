/**
    Route => /api/login
 */
const {Router} = require('express');
// We import the controller from 'AuthController'.
const {login, renewToken} = require('../controller/authController');

const {check} = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router();

router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields
    ],
    login
)

router.get('/renew',
    validateJWT,
    renewToken
)


module.exports = router;

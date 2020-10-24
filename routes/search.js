/**
 * Route => /api/full/:search
 */
const {Router} = require('express');
const {getDocumentsCollection} = require('../controller/searchController')
const {validateJWT} = require('../middlewares/validate-jwt');
const router = Router();

// Search by specific collection
router.get('/collection/:table/:search',validateJWT, getDocumentsCollection);

module.exports = router;

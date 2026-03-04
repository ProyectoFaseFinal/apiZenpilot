const {Router} = require('express');
const router = Router();
const {getAllAbout} = require('../controllers/aboutController.js');

router.get('/', getAllAbout);

module.exports = router;
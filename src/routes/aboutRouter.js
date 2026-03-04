const {Router} = require('express');
const router = Router();
const {getAllAbout, guardarAbout} = require('../controllers/aboutController.js');

router.get('/', getAllAbout);
router.post('/', guardarAbout);

module.exports = router;
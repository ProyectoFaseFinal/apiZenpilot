const {Router} = require('express');
const router = Router();
const {getAllAbout, guardarAbout, actualizarAbout, deleteAbout} = require('../controllers/aboutController.js');

router.get('/', getAllAbout);
router.post('/', guardarAbout);
router.put('/:id', actualizarAbout);
router.delete('/:id', deleteAbout);

module.exports = router;
const {Router} = require('express');
const router = Router();
const {getAllMedicalInformation, postMedicalInformation, updateMedicalInformation, deleteMedicalInformation} = require('../controllers/medical_informationController.js');

router.get('/', getAllMedicalInformation);
router.post('/', postMedicalInformation);
router.put('/:id', updateMedicalInformation);
router.delete('/:id', deleteMedicalInformation);

module.exports = router;
const { Router } = require('express');
const router = Router();
const {getsmartwatch, postSmartwatch, updateSmartwatch, deleteSmartwatch} = require('../controllers/smartwatchController.js');

router.get('/', getsmartwatch);
router.post('/', postSmartwatch);
router.put('/:id', updateSmartwatch);
router.delete('/:id', deleteSmartwatch);

module.exports = router;
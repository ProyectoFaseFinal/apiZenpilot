const { Router } = require('express');
const router = Router();
const {getSmartwatch, postSmartwatch, updateSmartwatch, deleteSmartwatch} = require('../controllers/smartwatchController.js');

router.get('/', getSmartwatch);
router.post('/', postSmartwatch);
router.put('/:id', updateSmartwatch);
router.delete('/:id', deleteSmartwatch);

module.exports = router;
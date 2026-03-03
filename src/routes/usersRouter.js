const { Router } = require('express');
const router = Router();
const {getAllUsers, getAllIdUsers, createUsers, actualizarUsers, deleteUsers} = require('../controllers/userController.js');

router.get('/', getAllUsers);
router.get('/:id', getAllIdUsers);
router.post('/', createUsers);
router.put('/:id', actualizarUsers);
router.delete('/:id', deleteUsers);

module.exports = router;
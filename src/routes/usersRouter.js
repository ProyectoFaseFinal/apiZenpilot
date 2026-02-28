const { Router } = require('express');
const router = Router();
const {getUsers} = require('../controllers/userController.js');

router.get('/', getUsers);

module.exports = router;
const express = require('express');
const router = express.Router();

const checkToken = require('../helpers/verify-token');
const UserController = require('../controllers/UserController');

router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.get('/checkuser', UserController.checkUser);
router.get('/:id', UserController.getUserById);

router.patch('/edit/:id', checkToken, UserController.editUser);

module.exports = router;
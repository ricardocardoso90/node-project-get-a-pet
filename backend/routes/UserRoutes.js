const express = require('express');
const router = express.Router();

const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload');

const UserController = require('../controllers/UserController');

router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.get('/checkuser', UserController.checkUser);
router.get('/:id', UserController.getUserById);

router.patch('/edit/:id', verifyToken, imageUpload.single("image"), UserController.editUser);

module.exports = router;
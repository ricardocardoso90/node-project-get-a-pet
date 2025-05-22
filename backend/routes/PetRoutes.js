const express = require('express');
const router = express.Router();

const PetController = require('../controllers/PetController');

router.post('/register', PetController.register);

module.exports = router;
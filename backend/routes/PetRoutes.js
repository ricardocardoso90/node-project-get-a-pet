const router = require('express').Router;

const PetController = require('../controllers/PetController');

router.post('/register', PetController.register);

module.exports = router;
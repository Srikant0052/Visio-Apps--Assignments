const express = require('express');
const router = express.Router();
const userControoler = require('../controller/userController');


router.post('/users',  userControoler.userRegistration);
router.post('/login', userControoler.userLogin);


module.exports = router;
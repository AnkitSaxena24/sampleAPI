const express = require('express');
const router = express.Router();

const usersController = require('../controller/usersController');

router.get('/users', usersController.getUser);

module.exports = router;
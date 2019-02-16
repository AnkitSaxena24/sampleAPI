const express = require('express');
const router = express.Router();

const usersController = require('../controller/usersController');

router.get('/users', usersController.getUser);
router.post('/add-user', usersController.addUser);
router.get('/user-data/', usersController.getSingleUser);
router.put('/update-user/', usersController.updateUser);
router.delete('/delete-user', usersController.deleteUser);


module.exports = router;
const express = require('express');
const userController = require('./../Controller/userController');
const authController = require('./../Controller/authController');

const router = express.Router();

router.post('/signUp', authController.signUp);

router.route('/').get(userController.getAllUsers);

module.exports = router;

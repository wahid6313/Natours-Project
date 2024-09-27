const express = require('express');
const userController = require('./../Controller/userController');
const authController = require('./../Controller/authController');

const router = express.Router();

router.post('/signUp', authController.signUp);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassword);

router.route('/').get(userController.getAllUsers);

module.exports = router;

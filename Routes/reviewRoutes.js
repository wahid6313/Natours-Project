const express = require('express');
const reviewcontroller = require('./../Controller/reviewController');
const authController = require('./../Controller/authController');

const router = express.Router();

router
  .route('/')
  .get(reviewcontroller.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewcontroller.createReviews,
  );

module.exports = router;

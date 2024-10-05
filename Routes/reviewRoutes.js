const express = require('express');
const reviewcontroller = require('./../Controller/reviewController');

const router = express.Router();

router.route('/').get(reviewcontroller.getAllReviews);

module.exports = router;

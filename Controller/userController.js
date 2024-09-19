const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(500).json({
    status: 'error',
    results: users.length,
    data: {
      users,
    },
  });
});

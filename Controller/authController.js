const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password exists--
  if (!email || !password) {
    return next(new AppError('please provide email and password', 400));
  }

  //check if user exist and password is corect--
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.corectPassword(password, user.password))) {
    return next(new AppError('Incorrect user and Password', 401)); //401--unauthorized
  }

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

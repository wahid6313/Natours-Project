const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('../utils/emails');
const crypto = require('crypto');

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

  //if everyone is okay, send token to clients--
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //getting token and check of it's there --
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not log in !  Please get log in ', 401));
  }

  //verification token--
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //check if user still exists--
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('the user belonging this token does not no longer'),
    );
  }

  //check if user changed the password after the token was issued--
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('user recently changed password! please log in again', 401),
    );
  }

  req.user = freshUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('you do not have permission to perform this action', 403),
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //get user based on posted email--
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('there is no user this email address', 404));
  }

  //generate the random reset token--
  const resetToken = user.createPasswordResetToken();

  //send it to user email--
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

  const message = `forgot your password please enter your password and confirm password: ${resetURL}.\n if you enter please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'your password reset token is valid for 10 min',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'token send to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('there was an error sending the eamil! please try again!'),
      500,
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.tokens)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('token is valid or has expired'));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

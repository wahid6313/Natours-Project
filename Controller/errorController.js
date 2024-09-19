const { JsonWebTokenError } = require('jsonwebtoken');
const AppError = require('../utils/appError');

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `duplicate fields value: x. please use another value! `;
  return new AppError(message, 400);
};

// const handleJwtError = (err) => new AppError('enter valid token', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    errro: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorPro = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'developement') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    // if (error.name === JsonWebTokenError) error = handleJwtError(error);
    sendErrorPro(err, res);
  }
};

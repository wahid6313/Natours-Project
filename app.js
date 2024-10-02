const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const Tour = require('./models/tourModel');
const app = express();
const fs = require('fs');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controller/errorController');

//MIDLEWARE------------------------------------------------
if (process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));



app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});





app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//SEED DATA------------------

// app.get('/api/v1/seed-data', async function (req, res) {
//   try {
//     const data = fs.readFileSync('./wahid.json', 'utf-8');
//     const stringify = JSON.parse(data);
//     console.log(stringify);
//     const dataSeeded = await Tour.insertMany(stringify);

//     return res.status(201).json({
//       data: dataSeeded,
//     });
//   } catch (error) {
//     return res.send(error.message);
//   }
// });

app.get('*', (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

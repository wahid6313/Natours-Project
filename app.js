const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const Tour = require('./models/tourModel');
const app = express();
const fs = require('fs');

//MIDLEWARE------------------------------------------------
if (process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('hello i am midilleware !');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES HANDLERS-------------------------------------------

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id", deleteTour);

//ROUTES-------------------------------------------------

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

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

module.exports = app;

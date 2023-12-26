const express = require('express');
const morgan = require('morgan');
const path = require('path');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// middlewares
app.use(express.json()); //body parse (core)
app.use(morgan('dev')); //Logger for dev (3rd party) // to show api related logs
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); //logging time of request
  console.log('this is my custom middleware');
  next();
});

//Routes
app.get('/', (req, res) => {
  res.status(200).end('Welcome to Tours');
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', tourRouter);

module.exports = app;

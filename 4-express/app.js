const express = require('express');
const morgan = require('morgan');
const path = require('path');
const tourRouter = require('./routes/tourRoutes');

const app = express();

// middlewares
app.use(express.json()); //body parse (core)
app.use(morgan('dev')); //Logger for dev (3rd party)
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); //logging time of request
  console.log('this is my custom middleware');
  next();
});

app.route('/api/v1/tours', tourRouter);
module.exports = app;

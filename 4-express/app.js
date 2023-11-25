const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// middlewares
app.use(express.json()); //body parse (core)
app.use(morgan('dev')); //Logger for dev (3rd party)
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); //logging time of request
  console.log('this is my custom middleware');
  next();
});

const fs = require('fs');

// const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours`);

console.log(path.resolve(__dirname, `/dev-data/data/tours-simple.json`));
module.exports = app;

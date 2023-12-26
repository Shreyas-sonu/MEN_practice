const express = require('express');
const tourHelper = require('../controllers/tourHandlers');

const tourRouter = express.Router();

tourRouter.route('/').get(tourHelper.getAllTours).post(tourHelper.createTour);

tourRouter
  .route('/:id')
  .get(tourHelper.getTour)
  .patch(tourHelper.editTour)
  .delete(tourHelper.deleteTour);

module.exports = tourRouter;

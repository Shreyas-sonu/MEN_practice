const express = require('express');
const {
  createTour,
  top5Tour,
  getAllTours,
  getTourStats,
  getTour,
  deleteTour,
  patchTour,
} = require('./../controllers/tourHandlers');

const tourRouter = express.Router();
tourRouter.route('/top-5').get(top5Tour, getAllTours);
tourRouter.route('/stats').get(getTourStats);
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(patchTour).delete(deleteTour);

module.exports = tourRouter;

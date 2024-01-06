const express = require('express');
const {
  createTour,
  getAllTours,
  getTour,
  deleteTour,
  patchTour,
} = require('./../controllers/tourHandlers');

const tourRouter = express.Router();
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(patchTour).delete(deleteTour);

module.exports = tourRouter;

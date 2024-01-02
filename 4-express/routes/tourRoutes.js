const express = require('express');
const {
  createTour,
  getAllTours,
  getTour,
  checkId,
  deleteTour,
  patchTour,
  checkBody,
} = require('./../controllers/tourHandlers');

const tourRouter = express.Router();
tourRouter.param('id', checkId)
tourRouter.route('/').get(getAllTours).post(checkBody,createTour);
tourRouter.route('/:id').get(getTour).patch(patchTour).delete(deleteTour);

module.exports = tourRouter;

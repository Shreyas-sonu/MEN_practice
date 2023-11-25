const express = require('express');

const tourRouter = express.Router();

tourRouter.route('/').get().post();

tourRouter.route('/:id').get().patch().delete();

module.exports = tourRouter;

const express = require('express');

const userRouter = express.Router();

userRouter.route('/').get().post();

userRouter.route('/:id').get().patch().delete();

module.exports = userRouter;

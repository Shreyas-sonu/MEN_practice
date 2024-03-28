const express = require('express');
const {
  createUser,
  top5User,
  monthlyPlanUsers,
  getAllUsers,
  getUserStats,
  getUser,
  deleteUser,
  patchUser,
} = require('./../controllers/userHandlers');

const userRouter = express.Router();
userRouter.route('/monthly-plan/:year').get(monthlyPlanUsers);
userRouter.route('/top-5').get(top5User, getAllUsers);
userRouter.route('/stats').get(getUserStats);
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(patchUser).delete(deleteUser);

module.exports = userRouter;

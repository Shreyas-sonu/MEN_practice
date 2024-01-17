const fs = require('fs');
const User = require('../model/userModel');
const APIFeatures = require('../utils/apiFeatures');

exports.top5User = (req, res, next) => {
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,duration,images,difficulty,price,description';
  req.query.limit = 5;
  next();
};
//get all users
exports.getAllUsers = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const users = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
//create a user
exports.createUser = async (req, res) => {
  const body = req.body;
  try {
    const data = await User.create(body);
    res.status(201).json({ message: 'Data received Successfully', data: data });
  } catch (error) {
    res.status(400).json({ status: 'Failed', message: error });
  }
};
//get a single user
exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const Odata = await User.findOne({ _id: id }); // old method (UNIVERSAL)
    const data = await User.findById(id); // new method (SPEC for ID)
    res.status(200).json({
      status: 'success',
      data: data,
      old: Odata,
      length: data.length,
    });
  } catch (error) {
    res.status(404).json({ status: 'no data', error: error });
  }
};
exports.deleteUser = (req, res) => {
  console.log(usersForDuration);
  res.status(204).json({
    data: null,
  });
};
exports.patchUser = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Updated',
      data: data,
    });
  } catch (error) {
    res.status(400).json({ status: 'Failed', message: error });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({ status: 'Failed', message: error });
  }
};

//aggregation
exports.getUserStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' }, // converting the group criteria
          numUsers: { $sum: 1 }, //adds plus 1 for each of the docs passed through hence count all documents
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }  //? for filtering even after grouping
      // }
      {
        $sort: { avgPrice: 1 }, // 1 means ascending
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//Monthly statistics

exports.monthlyPlanUsers = async (req, res) => {
  try {
    const year = req.params.year;
    const data = await User.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $lte: new Date(`${year}-12-31`),
            $gte: new Date(`${year}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: {
            $month: '$startDates',
          },
          numUserStarts: { $sum: 1 },
          users: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numUserStarts: -1 },
      },
      {
        $limit: 12,
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

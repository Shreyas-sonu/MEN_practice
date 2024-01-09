const fs = require('fs');
const Tour = require('../model/tourModel');

exports.top5Tour = (req, res, next) => {
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,duration,images,difficulty,price,description';
  req.query.limit = 5;
  next();
};
//get all tours
exports.getAllTours = async (req, res) => {
  try {
    const excludedArray = ['page', 'sort', 'limit', 'id', 'next', 'fields'];
    const queryObj = { ...req.query };
    excludedArray.forEach((e) => delete queryObj[e]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    // const data = await Tour.find({ duration: 5, difficulty: 'easy' }); //! express method
    // const data = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy') //! mongooses method
    let query = Tour.find(JSON.parse(queryStr));
    if (req.query.sort) {
      query = query.sort(req.query.sort.split(',').join(' '));
    } else {
      query = query.sort('-createdAt');
    }
    if (req.query.fields) {
      console.log('what happening here');
      const mini = req.query.fields.split(',').join(' ');
      query = query.select(mini);
    } else {
      query = query.select('-__v');
    }
    const limit = req?.query?.limit ? Number(req.query.limit) : 10;
    const page = req?.query?.page ? Number(req.query.page) : 1;
    const totalLength = await query.length;
    query = query.skip(limit * (page - 1)).limit(limit);
    const data = await query;
    res.status(200).json({
      status: 'success',
      length: data.length,
      total_length: totalLength,
      page: page,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: 'no data', error: error });
  }
};
//create a tour
exports.createTour = async (req, res) => {
  const body = req.body;
  try {
    const data = await Tour.create(body);
    res.status(201).json({ message: 'Data received Successfully', data: data });
  } catch (error) {
    res.status(400).json({ status: 'Failed', message: error });
  }
};
//get a single tour
exports.getTour = async (req, res) => {
  const id = req.params.id;
  try {
    const Odata = await Tour.findOne({ _id: id }); // old method (UNIVERSAL)
    const data = await Tour.findById(id); // new method (SPEC for ID)
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
exports.deleteTour = (req, res) => {
  console.log(toursForDuration);
  res.status(204).json({
    data: null,
  });
};
exports.patchTour = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Tour.findByIdAndUpdate(id, req.body, {
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
exports.deleteTour = async (req, res) => {
  try {
    const id = req.params.id;
    await Tour.findByIdAndDelete(id);
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({ status: 'Failed', message: error });
  }
};

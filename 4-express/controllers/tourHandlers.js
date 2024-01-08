const fs = require('fs');
const path = require('path');
const Tour = require('../model/tourModel');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`)
);

//get all tours
exports.getAllTours = async (req, res) => {
  try {
    const excludedArray = ['page', 'sort', 'limit', 'id', 'next'];
    const queryObj = { ...req.query };
    excludedArray.forEach((e) => delete queryObj[e]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));
    // const data = await Tour.find({ duration: 5, difficulty: 'easy' }); //! express method
    // const data = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy') //! mongooses method
    const data = await Tour.find(JSON.parse(queryStr));
    res
      .status(200)
      .json({ status: 'success', length: data.length, data: data });
  } catch (error) {
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

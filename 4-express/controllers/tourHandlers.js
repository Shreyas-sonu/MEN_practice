const fs = require('fs');
const path = require('path');
const Tour = require('../model/tourModel');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`)
);

//get all tours
exports.getAllTours = async (req, res) => {
  try {
    const data = await Tour.find();
    res
      .status(200)
      .json({ status: 'success', data: data, length: data.length });
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
exports.editTour = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Tour.replaceOne({ _id: id }, req.body);
    res.status(200).json({
      status: 'Updated',
      data: data,
    });
  } catch (error) {
    res.status(400).json({ status: 'Failed', message: error });
  }
};
exports.deleteTour = (req, res) => {
  console.log(toursForDuration);
  res.status(204).json({
    data: null,
  });
};
exports.patchTour = (req, res) => {
  const id = req.params.id;
  const dataToPatch = tours.filter((e) => e.id === Number(req.params.id))[0];
  const newData = { ...dataToPatch, ...req.body };
  const latestData = tours;
  tours[id] = newData;
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours.json`,
    JSON.stringify(latestData),
    (err) => {
      console.log(err, 'error while patching');
    }
  );
  res.status(200).json({
    status: 'Updated',
    data: tours.filter((e) => e.id === Number(req.params))[0],
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};

const fs = require('fs');
const path = require('path');
const Tour = require('../model/tourModel');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`)
);

//get all tours
exports.getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: tours, length: tours.length });
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
exports.getTour = (req, res) => {
  const id = req.params.id;
  const toursForDuration = tours.filter((ex) => ex.id === id);
  res.status(200).json({
    status: 'success',
    data: toursForDuration,
    length: toursForDuration.length,
  });
};
exports.editTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: toursForDuration,
  });
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

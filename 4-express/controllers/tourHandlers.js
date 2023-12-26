const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours.json`)
);

exports.checkId = (req, res, next, val) => {
  const id = Number.parseInt(val);
  const toursForDuration = tours.filter((ex) => ex.id === id);
  if (toursForDuration.length === 0) {
    return res.status(404).json({ status: 'Failed', message: 'Invalid ID' });
  } else {
    next();
  }
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    res
      .status(400)
      .json({ status: 'failed', message: 'Missing name or price please add' });
  }
  next();
};
//get all tours
exports.getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: tours, length: tours.length });
};
//create a tour
exports.createTour = (req, res) => {
  console.log(req.body);
  const newId = tours.length;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours.json`,
    JSON.stringify(tours),
    (err) => {
      console.log(err);
    }
  );
  res.status(201).send('Data received Successfully');
};
//get a single tour
exports.getTour = (req, res, next, val) => {
  const id = Number.parseInt(val);
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

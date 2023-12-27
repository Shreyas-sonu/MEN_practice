const fs = require('fs');
const path = require('path');

console.log(path.join(__dirname, '../dev-data/data/tours-simple.json'));
// const tours = JSON.parse(
//   fs.readFileSync(path.join(__dirname,'../dev-data/data/tours-simple.json'))
// );

// exports.getAllTours = (req, res) => {
//   res.status(200).json({
//     status: 'Success',
//     data: tours,
//     length: tours.length,
//   });
// };
// exports.getTour = (req, res) => {
//   res.status(200).json({
//     status: 'Success',
//     data: tours.filter((e) => e.id === Number(req.param))[0],
//   });
// };
// exports.createTour = (req, res) => {
//   const newData = { id: tours.length, ...req.body };
//   const latestData = tours.push(newData);
//   fs.writeFile('../dev-data/data/tours-simple.json', latestData);
//   res.status(201).json({
//     status: 'Created',
//     data: newData,
//     length: tours.length,
//   });
// };
// exports.patchTour = (req, res) => {
//   const id = Number(req.param);
//   const dataToPatch = tours.filter((e) => e.id === Number(req.params))[0];
//   const newData = { dataToPatch, ...req.body };
//   const latestData = tours;
//   tours[id] = newData;
//   fs.writeFile('../dev-data/data/tours-simple.json', latestData);
//   res.status(200).json({
//     status: 'Updated',
//     data: tours.filter((e) => e.id === Number(req.params))[0],
//   });
// };
// exports.deleteTour = (req, res) => {
//   res.status(204).json({
//     status: 'Success',
//     data: null,
//   });
// };

const fs = require('fs');

const tours = fs.readFileSync(`${__dirname}/../dev-data/data/tours`);

console.log(tours);

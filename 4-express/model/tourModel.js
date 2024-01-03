const mongoose = require('mongoose');

//creating a schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true, // validation (in array) doesn't work here
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a name'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

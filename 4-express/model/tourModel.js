const mongoose = require('mongoose');

//creating a schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: [
      true,`Name Should be Unique`,
    ],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price bitch'],
  },
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

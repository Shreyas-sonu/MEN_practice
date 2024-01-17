const mongoose = require('mongoose');
const slugify = require('slugify');

//creating a schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// tourSchema.pre('save', function (next) {
//   console.log('i am saving now');
//   next();
// });
// tourSchema.pre('save', function (doc, next) {
//   console.log(doc);
//   next();
// });
// tourSchema.pre('find', function (next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });
// tourSchema.pre('findOne', function (next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });
tourSchema.pre(/^find/, function (next) {
  // will apply to all string starts with find
  this.find({ secretTour: { $ne: true } });
  next();
});
tourSchema.post(/^find/, function (doc, next) {
  console.log(doc);
  next();
});

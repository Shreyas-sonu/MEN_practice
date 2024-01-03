const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD); // data base connection string from .env
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Db connected');
  })
  .catch((err) => {
    console.log(err);
  });
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
const app = require('./app');

const testTour = new Tour({
  name: 'Somanahalli to Melavalli',
  price: 70,
  rating: 3.8,
  review: 'you biatch',
});
testTour
  .save()
  .then((data) => {
    console.log(data, 'arg1');
  })
  .catch((err) => {
    console.log(err, 'Earg1');
  });
const port = 5000;
app.listen(port, () => {
  console.log('server is up and running 111');
});

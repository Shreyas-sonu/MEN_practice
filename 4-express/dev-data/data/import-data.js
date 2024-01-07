const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../model/tourModel');

dotenv.config({ path: '../../config.env' });
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

const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data imported successfully');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
const clearData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data cleared successfully');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  clearData();
}

const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('./models/tourModel');
dotenv.config({ path: './.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log('DB connection successfully'));
async function connectionToDataBase() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('dataBase connected successfully');
  } catch (error) {
    console.log('Error while connection to dataBase', error.message);
  }
}

//READ JSON FILE-------------
const tours = JSON.parse(fs.readFileSync('./wahid.json', 'utf-8'));

//IMPORT DATA INTO DB--------
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data sucessfully loaded');
  } catch (err) {
    console.log(err.message);
  }
};

//DELETE DATA FROM DB--------
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data deleted is sucessfull');
  } catch (err) {
    console.log(err.message);
  }
};

console.log(process.argv);

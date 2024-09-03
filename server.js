const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

// Replace <PASSWORD> with the actual password
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// Connect to the MongoDB database
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log('DB connection successful!');
//   })
//   .catch((err) => {
//     console.error('DB connection error:', err.message);
//   });

async function connectionToDataBase() {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log('dataBase connected successfully');
  } catch (error) {
    console.log('Error while connection to dataBase', error.message);
  }
}

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await connectionToDataBase();
  console.log(`App running on port ${port}...`);
});

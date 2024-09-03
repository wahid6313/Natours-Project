const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour must have a name'],
  },
  rating: {
    type: Number,
    default: 4.7,
  },
  price: {
    type: Boolean,
    default: [true, 'a tour must have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

// const testTour = new Tour({
//     name: 'wahid-2',
//     price: false,
//     rating: 4.7,
//   });

//   testTour
//     .save()
//     .then((doc) => {
//       console.log(doc);
//     })
//     .catch((err) => {
//       console.log('error', err.message);
//     });

// async function saveTour() {
//   try {
//     const doc = await testTour.save();
//     console.log(doc);
//   } catch (err) {
//     console.log('error', err.message);
//   }
// }
// saveTour();

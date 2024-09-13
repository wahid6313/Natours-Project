const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'a tour must have a name'],
      trim: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'a tour must have duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'a tour must have maxGroupSize'],
    },

    rating: {
      type: Number,
      default: 4.7,
    },
    price: {
      type: Number,
      default: [true, 'a tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'a tour must have summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'a tour must have image cover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//VIRTUAL PROPERTIES
tourSchema.virtual('durationWeek').get(function () {
  return this.duration / 7;
});

//DOCUMENT MIDDLEWERE: run before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
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

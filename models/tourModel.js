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
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: ' discount price ({VALUE}) should be greater than price money',
      },
    },

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
    startLocation: {
      type: {
       type: String,
       default: "Point",
       enum: ["point"]
      },
      cordinates: [Number],
      address: String,
      description: String
   },
   locations: [
    {
      type: {
        type: [Number],
        default: "Point",
        enum: ["Point"]
      },
      cordinates: [Number],
      address: String,
      description: String
    }
   ]
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

//QUERY MIDDLEWARE
tourSchema.pre('find', function (next) {
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;



const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Enter your valid email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Enter your valid password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Enter a valid password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

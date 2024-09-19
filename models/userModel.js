const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Enter a valid password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'password are not same',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 16);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.corectPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

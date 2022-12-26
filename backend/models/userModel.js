/* eslint-disable quotes */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, 'Name should have >=3 characters'],
    maxLength: [15, 'Name should have <15 characters'],
  },
  email: {
    type: String,
    required: true,
    validator: [validator.isEmail, 'Enter a valid email address'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'Password needs to be atleast 8 characters long.'],
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator(el) {
        return el === this.password;
      },
      message: "Passwords don't match.",
    },
  },
  displayImage: String,
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;

const mongoose = require('mongoose');
const validator = require('validator');

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
  },
  displayImage: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;

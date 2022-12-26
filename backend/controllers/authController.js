const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const generateJWTtoken = (id) =>
  jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    displayImage: req.body.displayImage,
  });
  const token = generateJWTtoken(user._id);
  return res.status(201).json({ status: 'success', token, data: user });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Please provide email and password'), 400);
  // .select to get field which has select:false
  const user = await User.findOne({ email }).select('+password');
  // check if user exists and password is correct
  if (!user || !(await user.validatePassword(password, user.password)))
    return next(new AppError('Email or password is incorrect', 400));
  const token = generateJWTtoken(user._id);
  return res.status(200).json({ status: 'success', token });
});

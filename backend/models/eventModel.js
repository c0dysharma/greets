const mongoose = require('mongoose');
const validator = require('validator');
const typeConstant = require('../constants/typeConstant');

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [4, 'Event name string length should be >= 4'],
      maxLength: [15, 'Event name string length should be < 25'],
    },
    to: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: 'Enter a valid receipent email address.',
      },
    },
    from: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: 'Enter a valid from email address.',
      },
    },
    type: {
      type: String,
      required: true,
      trim: true,
      default: typeConstant.messageType.email,
      enum: Object.values(typeConstant.messageType),
    },
    messageBody: {
      type: String,
      trim: true,
      required: true,
      minLength: [4, 'Message body string length should be >= 4'],
      maxLength: [100, 'Message body string length should be < 100'],
    },
    dateTime: {
      type: Date,
      required: true,
      default: new Date(),
    },
    messageTitle: {
      type: String,
      trim: true,
      required: true,
      minLength: [4, 'Message body string length should be >= 4'],
      maxLength: [50, 'Message body string length should be < 50'],
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    repeat: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

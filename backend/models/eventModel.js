const mongoose = require('mongoose');
const typeConstant = require('../constants/typeConstant');
const customValidator = require('../utils/cutomValidators');

const eventSchema = mongoose.Schema(
  {
    userID: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [4, 'Event name string length should be >= 4'],
      maxLength: [30, 'Event name string length should be < 30'],
    },
    to: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: customValidator.validateReceipent,
        message: 'Enter a valid receipent address.',
      },
    },
    from: {
      type: String,
      trim: true,
      minLength: [4, 'Sender name string length should be >= 4'],
      maxLength: [30, 'Sender name string length should be < 30'],
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
      maxLength: [500, 'Message body string length should be < 500'],
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

const mongoose = require('mongoose');
const typeConstant = require('../constants/typeConstant');

const eventSchema = mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: typeConstant.messageType.email,
    },
    messageBody: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
      default: new Date(),
    },
    messageTitle: String,
    isActive: Boolean,
  },
  { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

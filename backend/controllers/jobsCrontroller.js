const catchAsync = require('../utils/catchAsync');
const emailScheduleJob = require('../jobs/emailScheduleJob');
const Event = require('../models/eventModel');

exports.getAllJobs = catchAsync(async (req, res, next) => {
  // keys are event._id
  const jobs = Object.keys(emailScheduleJob.jobs);
  // get data for jobs
  const events = await Event.find({ _id: { $in: jobs } }).select(
    'name dateTime isActive repeat'
  );

  const data = [];
  events.forEach((event) => {
    data.push({ ...event._doc, dateTime: event.dateTime.toLocaleString() });
  });
  res.status(200).json({ status: 'success', data });
});

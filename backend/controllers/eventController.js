const Event = require('../models/eventModel');
const RequestFeatures = require('../utils/requestFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const emailScheduleJob = require('../jobs/emailScheduleJob');

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const Query = new RequestFeatures(Event.find(), req.query)
    .filter(req.user._id)
    .sort()
    .limitFields()
    .paginate();
  const allEvents = await Query.query;
  return res.status(200).json({ status: 'success', data: allEvents });
});

exports.createEvent = catchAsync(async (req, res, next) => {
  const createdEvent = await Event.create({
    ...req.body,
    from: req.user.name,
    userID: req.user._id,
  });
  emailScheduleJob.fromDate(createdEvent);
  return res.status(201).json({ status: 'success', data: createdEvent });
});

exports.getEvent = catchAsync(async (req, res, next) => {
  const Query = new RequestFeatures(Event.findById(req.params.id), req.query)
    .filter(req.user._id)
    .limitFields();
  const foundEvent = await Query.query;

  if (!foundEvent.length)
    // after using requestFeatures return value is an array
    return next(new AppError('Requested resource not found', 404));

  return res.status(200).json({ status: 'success', data: foundEvent });
});

exports.updateEvent = catchAsync(async (req, res, next) => {
  const Query = new RequestFeatures(Event.findById(req.params.id), req.query)
    .filter(req.user._id)
    .limitFields();
  const foundEvent = await Query.query;

  if (!foundEvent.length)
    // after using requestFeatures return value is an array
    return next(new AppError('Requested resource not found', 404));

  // body sanitization
  const updatingFields = req.body;
  updatingFields.userID = undefined;
  updatingFields._id = undefined;

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    updatingFields,
    {
      runValidators: true,
      new: true,
    }
  );
  if (updatingFields.dateTime) emailScheduleJob.fromDate(updatedEvent);
  return res.status(200).json({ status: 'success', data: updatedEvent });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const Query = new RequestFeatures(Event.findById(req.params.id), req.query)
    .filter(req.user._id)
    .limitFields();
  const foundEvent = await Query.query;

  if (!foundEvent.length)
    // after using requestFeatures return value is an array
    return next(new AppError('Requested resource not found', 404));

  const deletedEvent = await Event.findByIdAndRemove(req.params.id);
  // delete its job if scheduled
  emailScheduleJob.cancel(deletedEvent._id);
  return res.status(204).json({ status: 'success', data: deletedEvent });
});

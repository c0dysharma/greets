const Event = require('../models/eventModel');
const RequestFeatures = require('../utils/requestFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const Query = new RequestFeatures(Event.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const allEvents = await Query.query;
  return res.status(200).json({ status: 'success', data: allEvents });
});

exports.createEvent = async (req, res, next) => {
  const createdEvent = await Event.create(req.body);
  return res.status(201).json({ status: 'success', data: createdEvent });
};

exports.getEvent = catchAsync(async (req, res, next) => {
  const Query = new RequestFeatures(Event.findById(req.params.id), req.query)
    .filter()
    .limitFields();
  const foundEvent = await Query.query;

  if (!foundEvent.length)
    // after using requestFeatures return value is an array
    return next(new AppError('Requested resource not found', 404));

  return res.status(200).json({ status: 'success', data: foundEvent });
});

exports.updateEvent = async (req, res, next) => {
  const foundEvent = await Event.findById(req.params.id);
  if (!foundEvent)
    return next(new AppError('Requested resource not found', 404));

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  return res.status(200).json({ status: 'success', data: updatedEvent });
};

exports.deleteEvent = async (req, res, next) => {
  const foundEvent = await Event.findById(req.params.id);
  if (!foundEvent)
    return next(new AppError('Requested resource not found', 404));

  const deletedEvent = await Event.findByIdAndRemove(req.params.id);
  return res.status(204).json({ status: 'success', data: deletedEvent });
};

const Event = require('../models/eventModel');
const RequestFeatures = require('../utils/requestFeatures');

exports.getAllEvents = async (req, res) => {
  const Query = new RequestFeatures(Event, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const allEvents = await Query.query;
  return res.status(200).json({ status: 'success', data: allEvents });
};

exports.createEvent = async (req, res) => {
  const createdEvent = await Event.create(req.body);
  return res.status(201).json({ status: 'success', data: createdEvent });
};

exports.getEvent = async (req, res) => {
  const foundEvent = await Event.findById(req.params.id);
  if (!foundEvent) return res.status(404).json({ status: 'faild', data: [] });

  return res.status(200).json({ status: 'success', data: foundEvent });
};

exports.updateEvent = async (req, res) => {
  const foundEvent = await Event.findById(req.params.id);
  if (!foundEvent) return res.status(404).json({ status: 'faild', data: [] });

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  return res.status(200).json({ status: 'success', data: updatedEvent });
};

exports.deleteEvent = async (req, res) => {
  const foundEvent = await Event.findById(req.params.id);
  if (!foundEvent) return res.status(404).json({ status: 'faild', data: [] });

  const deletedEvent = await Event.findByIdAndRemove(req.params.id);
  return res.status(204).json({ status: 'success', data: deletedEvent });
};

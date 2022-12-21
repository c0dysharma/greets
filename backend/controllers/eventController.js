const Event = require('../models/eventModel');

exports.getAllEvents = async (req, res) => {
  const allEvents = await Event.find({});
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

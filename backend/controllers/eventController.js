const Event = require('../models/eventModel');

exports.getAllEvents = async (req, res) => {
  const allEvents = await Event.find({});
  res.status(200).json({ status: 'success', data: allEvents });
};

exports.createEvent = async (req, res) => {
  const createdEvent = await Event.create(req.body);
  res.status(201).json({ status: 'success', data: createdEvent });
};

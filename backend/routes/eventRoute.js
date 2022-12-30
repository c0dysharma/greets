const express = require('express');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.validateUser, eventController.getAllEvents)
  .post(authController.validateUser, eventController.createEvent);

router
  .route('/:id')
  .get(authController.validateUser, eventController.getEvent)
  .patch(authController.validateUser, eventController.updateEvent)
  .delete(authController.validateUser, eventController.deleteEvent);

module.exports = router;

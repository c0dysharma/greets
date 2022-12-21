const express = require('express');
const morgan = require('morgan');

const eventsRouter = require('./routes/eventRoutes');

const app = express();
app.use(morgan('dev'));
app.use('/api/v1/events', eventsRouter);

module.exports = app;

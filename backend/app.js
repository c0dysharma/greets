const express = require('express');
const morgan = require('morgan');

const eventsRouter = require('./routes/eventRoute');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/events', eventsRouter);

module.exports = app;

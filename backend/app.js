const express = require('express');
const morgan = require('morgan');

const eventsRouter = require('./routes/eventRoute');
const userRouter = require('./routes/userRouter');
const jobsRouter = require('./routes/jobsRoute');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1/events', eventsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/jobs', jobsRouter);

// if no router handled the request its a 404 error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on server.`, 404));
});

// catch erer
app.use(globalErrorHandler);
module.exports = app;

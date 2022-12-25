const AppError = require('../utils/appError');

const sendErrorDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error(`ERROR 💥 ${JSON.stringify(err)}`);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong.',
  });
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const message = `${err.message}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message || 'Internal server error.';

  if (process.env.NODE_ENV !== 'production') return sendErrorDev(err, res);
  // when its in production
  if (err.name === 'CastError') err = handleCastErrorDB(err);
  if (err.name === 'ValidationError') err = handleValidationErrorDB(err);

  return sendErrorProd(err, res);
};

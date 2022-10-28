const { CustomAPIError } = require('../errors/customError');

const errorHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: 'Database error, please try again' });
};

module.exports = errorHandler;
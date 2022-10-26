require('dotenv/config');
const jwt = require('jsonwebtoken');
const { createCustomError } = require('../errors/customError');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '1m',
    algorithm: 'HS256',
  });
  return token;
};

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (err) {
    throw createCustomError('Expired or invalid token', 401);
  }
};

module.exports = {
  createToken,
  validateToken,
};

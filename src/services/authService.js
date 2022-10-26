const { User } = require('../models');
const { loginSchema } = require('./validations/schemas');
const jwt = require('../utils/jwtUtils');
const { createCustomError } = require('../errors/customError');

const validateLoginFields = (data) => {
  const { error, value } = loginSchema.validate(data);
  
  if (error) throw createCustomError(error.message, 400);
  
  return value;
};

const validateLoginData = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  
  if (!user || user.password !== password) {
    throw createCustomError('Invalid fields', 400);
  }

  const { password: _, ...userWithNoPassword } = user.dataValues;
  const token = jwt.createToken(userWithNoPassword);
  return token;
};

module.exports = {
  validateLoginFields,
  validateLoginData,
};

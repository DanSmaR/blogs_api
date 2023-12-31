const { User } = require('../models');
const { userSchema } = require('./validations/schemas');
const jwt = require('../utils/jwtUtils');
const { createCustomError } = require('../errors/customError');

const validateUserData = (data) => {
  const { error, value } = userSchema.validate(data);
  if (error) throw createCustomError(error.message, 400);
  return value;
};

const verifyDuplicatedEmail = async ({ email }) => {
  const user = await User.findOne({ where: { email } });
  if (user) throw createCustomError('User already registered', 409);
  return null;
};

const createUser = async (data) => {
  const { displayName, email, password, image } = data;
  const newUser = await User.create({ displayName, email, password, image });
  const { password: _, ...newUserWithNoPassword } = newUser;
  const token = jwt.createToken(newUserWithNoPassword);
  return token;
};

const getUsers = () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserById = (id) => User.findByPk(id, { attributes: { exclude: ['password'] } });

const deleteUserLogged = async (id) => {
  const deletedRow = await User.destroy({ where: { id } });
  if (deletedRow < 1) throw createCustomError('User not deleted. Database Error', 401);
  return true;
};

module.exports = {
  validateUserData,
  verifyDuplicatedEmail,
  createUser,
  getUsers,
  getUserById,
  deleteUserLogged,
};

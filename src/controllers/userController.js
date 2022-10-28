const { createCustomError } = require('../errors/customError');
const { userService } = require('../services');

const createUser = async (req, res) => {
  const data = userService.validateUserData(req.body);
  await userService.verifyDuplicatedEmail(data);
  const token = await userService.createUser(data);
  return res.status(201).json({ token });
};

const getUsers = async (_req, res) => {
  const users = await userService.getUsers();
  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (!user) throw createCustomError('User does not exist', 404);
  return res.status(200).json(user);
};

const deleteUserLogged = async (req, res) => {
  await userService.deleteUserLogged(req.data.id);
  return res.status(204).end();
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUserLogged,
};

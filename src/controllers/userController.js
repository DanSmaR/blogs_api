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

module.exports = {
  createUser,
  getUsers,
};

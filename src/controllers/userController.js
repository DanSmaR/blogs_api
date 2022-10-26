const { userService } = require('../services');

const createUser = async (req, res) => {
  const data = userService.validateUserData(req.body);
  await userService.verifyDuplicatedEmail(data);
  const token = await userService.createUser(data);
  return res.status(201).json({ token });
};

module.exports = {
  createUser,
};

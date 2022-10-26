const { authService } = require('../services');

const login = async (req, res) => {
  const { email, password } = authService.validateLoginFields(req.body);

  const token = await authService.validateLoginData({ email, password });

  res.status(200).json({ token });
};

module.exports = {
  login,
};

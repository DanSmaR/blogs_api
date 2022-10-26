const { authService } = require('../services');

const validateToken = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  const data = authService.validateToken(token);
  req.data = data;
  next();
};

module.exports = validateToken;
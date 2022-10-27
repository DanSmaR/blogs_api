const { postService } = require('../services');

const checkPostExistence = async (req, _res, next) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);
  req.post = post;
  next();
};

module.exports = checkPostExistence;
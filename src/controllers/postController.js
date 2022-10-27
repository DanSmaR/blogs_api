const { postService } = require('../services');

const createPost = async (req, res) => {
  const newPost = await postService.createPost(req.body, req.data.id);
  return res.status(201).send(newPost);
};

module.exports = {
  createPost,
};

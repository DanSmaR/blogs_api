const { postService } = require('../services');

const createPost = async (req, res) => {
  const data = postService.validatePostData(req.body);
  await postService.verifyCategory(data);
  const newPost = await postService.createPost(data, req.data.id);
  return res.status(201).send(newPost);
};

module.exports = {
  createPost,
};

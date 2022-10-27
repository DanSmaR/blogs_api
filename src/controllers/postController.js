const { postService } = require('../services');

const createPost = async (req, res) => {
  const data = postService.validatePostData(req.body);
  await postService.verifyCategory(data);
  const newPost = await postService.createPost(data, req.data.id);
  return res.status(201).send(newPost);
};

const getPosts = async (req, res) => {
  const posts = await postService.getPosts();
  return res.status(200).json(posts);
};

module.exports = {
  createPost,
  getPosts,
};

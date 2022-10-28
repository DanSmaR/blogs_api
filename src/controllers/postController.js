const { postService } = require('../services');

const createPost = async (req, res) => {
  const data = postService.validatePostData(req.body);
  await postService.verifyCategory(data);
  const newPost = await postService.createPost(data, req.data.id);
  return res.status(201).send(newPost);
};

const getPosts = async (_req, res) => {
  const posts = await postService.getPosts();
  return res.status(200).json(posts);
};

const getPostById = async (req, res) => res.status(200).json(req.post);

const updatePost = async (req, res) => {
  const data = postService.validateUpdatePost(req.body);
  const { id } = req.params;
  await postService.updatePost(data, id, req.data.id);
  const updatedPost = await postService.getPostById(id);
  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await postService.deletePost(id, req.data.id);
  return res.status(204).end();
};

const searchPosts = async (req, res) => {
  const { q: query } = req.query;
  const posts = await postService.searchPosts(query);
  console.log({ posts });
  return res.status(200).json(posts);
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPosts,
};

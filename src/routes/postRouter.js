const express = require('express');

const { postController } = require('../controllers');
const { validateToken, checkPostExistence } = require('../middlewares');

const router = express.Router();

router.use(validateToken);

router.route('/')
  .post(postController.createPost)
  .get(postController.getPosts);
  
router.route('/search')
  .get(postController.searchPosts);

router.route('/:id')
  .get(checkPostExistence, postController.getPostById)
  .put(checkPostExistence, postController.updatePost)
  .delete(checkPostExistence, postController.deletePost);

module.exports = router;
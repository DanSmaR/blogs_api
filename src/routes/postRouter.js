const express = require('express');

const { postController } = require('../controllers');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.use(validateToken);

router.route('/')
  .post(postController.createPost)
  .get(postController.getPosts);

router.route('/:id')
  .get(postController.getPostById)
  .put(postController.updatePost);
module.exports = router;
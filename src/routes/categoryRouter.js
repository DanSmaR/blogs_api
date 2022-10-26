const express = require('express');
const { categoryController } = require('../controllers');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.use(validateToken);

router.route('/')
  .post(categoryController.createCategory)
  .get(categoryController.getCategories);

module.exports = router;

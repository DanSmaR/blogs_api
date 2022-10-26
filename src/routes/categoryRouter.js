const express = require('express');
const { categoryController } = require('../controllers');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.route('/')
  .post(validateToken, categoryController.createCategory);

module.exports = router;  
const express = require('express');
const { userController } = require('../controllers');
const { validateToken } = require('../middlewares');

const router = express.Router();

router.route('/')
  .post(userController.createUser)
  .get(validateToken, userController.getUsers);

module.exports = router;
const express = require('express');
const authRouter = require('./authRouter');

const routers = express.Router();

routers.use('/login', authRouter);

module.exports = routers;
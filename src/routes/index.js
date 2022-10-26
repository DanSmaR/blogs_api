const express = require('express');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

const routers = express.Router();

routers.use('/login', authRouter);
routers.use('/user', userRouter);

module.exports = routers;
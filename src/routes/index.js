const express = require('express');

const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const postRouter = require('./postRouter');

const routers = express.Router();

routers.use('/login', authRouter);
routers.use('/user', userRouter);
routers.use('/categories', categoryRouter);
routers.use('/post', postRouter);

module.exports = routers;
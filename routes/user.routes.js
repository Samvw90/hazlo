const express = require('express');
const userRouter = express.Router();

const { authUser, verifyToken } = require('../controller/auth.controller');

const { createUser, getUser } = require('../controller/user.controller');

userRouter.post('/signup', verifyToken, createUser);

userRouter.post('/login', verifyToken, getUser);

module.exports = userRouter;

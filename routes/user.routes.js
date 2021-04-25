const express = require('express');
const userRouter = express.Router();

const { authUser } = require('../controller/auth.controller');

const { createUser } = require('../controller/user.controller');

userRouter.post('/signup', authUser, createUser);

module.exports = userRouter;

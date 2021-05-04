const express = require('express');
const taskRouter = express.Router();

const { verifyToken } = require('../controller/auth.controller');

const { createTask } = require('../controller/task.controller');

taskRouter.post('/new-task', verifyToken, createTask);

module.exports = taskRouter;

const express = require('express');
const taskRouter = express.Router();

const { verifyToken } = require('../controller/auth.controller');

const { createTask, getUserTasks } = require('../controller/task.controller');

taskRouter.post('/new-task', verifyToken, createTask);

taskRouter.get('/', verifyToken, getUserTasks);

module.exports = taskRouter;

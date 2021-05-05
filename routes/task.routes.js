const express = require('express');
const taskRouter = express.Router();

const { verifyToken } = require('../controller/auth.controller');

const {
    createTask,
    getTasks,
    deleteTask,
} = require('../controller/task.controller');

taskRouter.post('/new-task', verifyToken, createTask);

taskRouter.get('/', verifyToken, getTasks);

taskRouter.delete('/', verifyToken, deleteTask);

module.exports = taskRouter;

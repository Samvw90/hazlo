const express = require('express');
const taskRouter = express.Router();

const { verifyToken } = require('../controller/auth.controller');

const {
    createTask,
    getTasks,
    deleteTask,
    updateTask,
} = require('../controller/task.controller');

taskRouter.post('/new-task', verifyToken, createTask);

taskRouter.get('/', verifyToken, getTasks);

taskRouter.delete('/', verifyToken, deleteTask);

taskRouter.put('/', verifyToken, updateTask);

module.exports = taskRouter;

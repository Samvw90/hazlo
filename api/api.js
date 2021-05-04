const express = require('express');
const apiRouter = express.Router();

const userRouter = require('../routes/user.routes');
const taskRouter = require('../routes/task.routes');

apiRouter.get('/', async (req, res) => {
    res.status(200).send('api router');
});

apiRouter.use('/user', userRouter);

apiRouter.use('/tasks', taskRouter);

module.exports = apiRouter;

const express = require('express');
const apiRouter = express.Router();

const userRouter = require('../routes/user.routes');

apiRouter.get('/', async (req, res) => {
    res.status(200).send('api router');
});

apiRouter.use('/user', userRouter);

module.exports = apiRouter;

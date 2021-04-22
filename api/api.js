const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', async (req, res) => {
    res.status(200).send('api router');
});

module.exports = apiRouter;

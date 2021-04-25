const express = require('express');
const testRouter = express.Router();

const {
    getAllUsers,
    deleteMultipleUsers,
} = require('../controller/test.controller');

testRouter.get('/all-users', getAllUsers);

testRouter.delete('/all-users/delete', deleteMultipleUsers);

module.exports = testRouter;

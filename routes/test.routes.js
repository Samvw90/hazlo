const express = require('express');
const testRouter = express.Router();

const {
    getAllUsers,
    deleteMultipleUsers,
    signInUser,
} = require('../controller/test.controller');

testRouter.get('/all-users', getAllUsers);

testRouter.delete('/all-users/delete', deleteMultipleUsers);

testRouter.post('/signup', signInUser);

module.exports = testRouter;

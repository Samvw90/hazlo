const admin = require('firebase-admin');
const User = require('../models/userSchema');

exports.getAllUsers = async (req, res, next) => {
    try {
        const request = await admin.auth().listUsers();
        const userArr = [];
        request.users.forEach((user) => userArr.push(user.uid));
        req.userArr = userArr;
        res.status(200).json(request.users);
        next();
        // console.log(req.userArr);
    } catch (err) {
        next(err);
    }
};

exports.deleteMultipleUsers = async (req, res, next) => {
    try {
        const requestList = await admin.auth().listUsers();
        const userArr = [];
        requestList.users.forEach((user) => userArr.push(user.uid));
        const request = await admin.auth().deleteUsers(userArr);
        // console.log(`Successfully deleted ${request.successCount} users`);
        // console.log(`Failed to delete ${request.failureCount} users`);
        // request.errors.forEach((err) => {
        //     console.log(err.error.toJSON());
        // });

        const dbRequest = await User.deleteMany({});

        if (!request) {
            res.status(400).send('request failed');
        } else {
            res.status(200).json({
                successCount: request.successCount,
                failureCount: request.failureCount,
                dbSuccess: dbRequest.ok,
                dbDeleteCount: dbRequest.deletedCount,
            });
        }
    } catch (err) {
        next(err);
    }
};

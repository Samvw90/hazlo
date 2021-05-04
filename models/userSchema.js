const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const taskSchema = require('./taskSchema');

const userSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    creationDate: { type: Date, default: Date.now },
    tasks: {
        type: [taskSchema],
    },
});

module.exports = model('User', userSchema);

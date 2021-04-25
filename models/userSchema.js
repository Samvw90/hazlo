const mongoose = require('mongoose');

const { Schema, model } = mongoose;

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
        type: Array,
        default: undefined,
    },
});

module.exports = model('User', userSchema);

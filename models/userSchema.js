const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    creationDate: { type: Date.now },
    tasks: {
        type: Array,
        default: undefined,
    },
});

module.exports = model('User', userSchema);

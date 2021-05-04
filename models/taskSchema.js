const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    taskTitle: { type: String, required: true },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    completed: Boolean,
});

module.exports = taskSchema;

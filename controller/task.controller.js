const User = require('../models/userSchema');

exports.createTask = async (req, res, next) => {
    try {
        const { taskTitle, dueDate } = req.body.task;

        const data = {
            taskTitle: taskTitle,
            dueDate: dueDate,
        };
        const userDocument = await User.findOne({ _id: req.uid });

        userDocument.tasks.push(data);

        const save = await userDocument.save();

        // console.log(save);

        res.status(201).json({ save });
    } catch (err) {
        console.log(`Error: ${err}`);
        next(err);
    }
};

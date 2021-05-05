const User = require('../models/userSchema');

exports.createTask = async (req, res, next) => {
    try {
        const { taskTitle, dueDate } = req.body.task;

        // console.log(req.headers.authorization.split(' ')[1]);

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

exports.getTasks = async (req, res, next) => {
    try {
        const userDocument = await User.findById(req.uid);
        // console.log(userDocument.tasks);
        // console.log(userDocument.tasks.id(userDocument.tasks[0]._id));
        res.status(200).json({ tasks: userDocument.tasks });
    } catch (err) {
        console.log(`Error: ${err}`);
        next(err);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const userDocument = await User.findById(req.uid);

        // console.log(userDocument.tasks.id(req.body.taskId).update({taskTitle: 'Udtadeeeddd'}), '<-----');
        userDocument.tasks.id(req.body.taskId).remove();
        // userDocument.tasks
        //     .id(req.body.taskId)
        //     .set({ taskTitle: 'Udtadeeeddd' });
        const save = await userDocument.save();

        // console.log(save);

        res.status(200).json({ save });
    } catch (err) {
        console.log(`Error: ${err}`);
        next(err);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
    } catch (err) {
        console.log(`Error: ${err}`);
        next(err);
    }
};

const Task = require('../models/taskSchema');
const asyncWrappar = require('../middleware/async');
const { createCustomeAPIErorr } = require('../error/error_custome');

const getAllTasks = asyncWrappar (async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).send({ tasks });        
});

const createTask = asyncWrappar (async (req, res) => {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
})

const getTask = asyncWrappar (async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task){
        return next(createCustomeAPIErorr(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({ task });
})
const updataTask = asyncWrappar (async (req, res, next) => {
    const {id: taskID } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    });
    if (!task){
        return next(createCustomeAPIErorr(`No task with id: ${taskID}`, 404));
    }
    res.status(200).send({ task });
});

const deleteTask = (async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomeAPIErorr(`No task with id: ${taskID}`, 404));
    }
    res.status(200).send({ task });
});

module.exports = {
    getAllTasks, 
    createTask,
    getTask,
    updataTask,
    deleteTask
}
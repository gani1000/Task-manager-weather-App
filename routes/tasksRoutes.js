const express = require('express');
const router = express.Router();
const 
{ 
    getAllTasks,
    createTask,
    getTask,
    updataTask,
    deleteTask
} = require('../controllers/task_controllers');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updataTask).delete(deleteTask);


module.exports = router;
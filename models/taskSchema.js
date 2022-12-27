const mongoose = require('mongoose');

const TaskShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provied name'],
        trim: true,
        maxlength: [50, 'name can not be more then 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Task', TaskShema);
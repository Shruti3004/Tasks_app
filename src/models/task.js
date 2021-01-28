const mongoose = require('mongoose');
const validator = require('validator');
require('../db/mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Tasks = mongoose.model('Tasks', taskSchema);

module.exports = Tasks;
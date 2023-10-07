const mongoose = require('mongoose');


const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    // dueDate: Date,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Todo', TodoSchema, 'todos');



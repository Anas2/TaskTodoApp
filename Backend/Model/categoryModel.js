const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    dueDate: Date,
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo',
        },
    ],
});

const Category = mongoose.model('Category', CategorySchema, 'categories');

module.exports = Category;


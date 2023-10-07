const TodoModel = require('../Model/todoModel');
const CategoryModel = require('../Model/categoryModel');

const TodoController = {


    async createTodo(req, res, next) {
        try {


            const { title, /*dueDate,*/ categoryId } = req.body;
            const category = await CategoryModel.findById(categoryId);
            if (!category) {
                const err = {
                    message: 'Category not found',
                    status: 404,
                    success: false
                }
                // return res.status(404).json({ success: false, error: 'Category not found' });
                return next(err);
            }
            const todo = new TodoModel({
                title,
                // dueDate,  
                category: categoryId, 
            });
            await todo.save();
            category.todos.push(todo); 
            await category.save();
            res.status(201).json({ success: true, data: todo });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async deleteTodo(req, res, next) {
        try {
            const todoId = req.params.id;

            const deletedTodo = await TodoModel.findByIdAndDelete(todoId);

            if (!deletedTodo) {
                return res.status(404).json({ success: false, message: 'Todo not found' });
            }

            res.status(200).json({ success: true, message: 'Todo deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async updateStatus(req, res, next) {
        try {

            const { id, status } = req.body;
            console.log(id);

            const updatedTodo = await TodoModel.findOneAndUpdate({ _id: id }, { completed: status }, { new: true });
            if (!updatedTodo) {
                return res.status(404).json({ success: false, message: 'Todo not updated successfully' });
            }
            res.status(200).json({ success: true, message: 'Todo updated successfully...', updatedTodo: updatedTodo });

        } catch (error) {
            res.status(500).json({ success: false, error: error.message });

        }

    }
}

module.exports = TodoController;
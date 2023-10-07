const CategoryModel = require('../Model/categoryModel');
const TodoModel = require('../Model/todoModel');

const CategoryController = {


    async createCategory(req, res, next) {
        try {
            const { name, dueDate } = req.body;
            const category = new CategoryModel({
                name,
                dueDate,
            });
            await category.save();
            res.status(201).json({ success: true, data: category });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async getAllCategories(req, res, next) {
        // Get All Categories API
        try {
            const categories = await CategoryModel.find().populate('todos');

            res.status(200).json({ success: true, data: categories });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    async deleteCategoryById(req, res, next) {
        try {
            const catId = req.params.id;

            const deleteCategory = await CategoryModel.findByIdAndDelete(catId);
            await TodoModel.deleteMany({ category: catId });

            if (!deleteCategory) {
                return res.status(404).json({ success: false, message: 'Category not found' });
            }

            res.status(200).json({ success: true, message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },


}

module.exports = CategoryController;
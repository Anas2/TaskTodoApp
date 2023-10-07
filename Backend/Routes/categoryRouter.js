const express = require('express');
const route = express.Router();
const CategoryController = require('../Constroller/categoryController');

route.get('/', CategoryController.getAllCategories)
route.post('/addCategory', CategoryController.createCategory)
route.delete('/deleteCategory/:id', CategoryController.deleteCategoryById)

module.exports = route; 
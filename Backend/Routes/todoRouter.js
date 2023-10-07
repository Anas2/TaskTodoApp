const express = require('express');
const route = express.Router();
const TodoController = require('../Constroller/todoController');

route.post('/addTodo', TodoController.createTodo)
route.put('/updateTodoStatus', TodoController.updateStatus)
route.delete('/deleteTodo/:id', TodoController.deleteTodo)

module.exports = route; 
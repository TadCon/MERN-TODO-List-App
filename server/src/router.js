const express = require('express');

//Login
const isLoggedIn = require('./middleware/isLoggedIn');

//Rutas
const loginRoute= require('./routes/loginRoute');
const createTodoRoute=  require('./routes/CRUD/createTodoRoute');
const readTodosRoute = require('./routes/CRUD/readTodosRoute');
const updateTodoRoute = require('./routes/CRUD/updateTodoRoute');
const deleteTodoRoute = require('./routes/CRUD/deleteTodoRoute');

const router = express.Router();

//Login
router.post('/login', loginRoute);

//CRUD
router.post('/todos', isLoggedIn, createTodoRoute); 
router.get('/todos', isLoggedIn, readTodosRoute); 
router.put('/todos/:id', isLoggedIn, updateTodoRoute); 
router.delete('/todos/:id', isLoggedIn, deleteTodoRoute); 

module.exports = router;
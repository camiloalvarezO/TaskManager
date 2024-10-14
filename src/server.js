const express = require('express');
const MySQLTaskRepository = require('./infrastructure/repositories/taskRepository');
const TaskService = require('./application/taskService');
const UserService = require('./application/userService');
const taskController = require('./infrastructure/web/taskController');
const userController = require('./infrastructure/web/userController');

const app = express();
app.use(express.json());

const taskRepository = new MySQLTaskRepository();
const taskService = new TaskService(taskRepository);

app.use('/api/tasks', taskController(taskService));
app.use('/api/users', userController(UserService));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
const express = require('express');
const MySQLTaskRepository = require('./infrastructure/repositories/taskRepository');
const MySQLUserRepository = require('./infrastructure/repositories/userRepository');
const TaskService = require('./application/taskService');
const UserService = require('./application/userService');
const taskController = require('./infrastructure/web/taskController');
const userController = require('./infrastructure/web/userController');

const app = express();
app.use(express.json());

const taskRepository = new MySQLTaskRepository();
const taskService = new TaskService(taskRepository);

const userRepository = new MySQLUserRepository();
const userService = new UserService(userRepository);

app.use('/api/tasks', taskController(taskService));
app.use('/api/users', userController(userService));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
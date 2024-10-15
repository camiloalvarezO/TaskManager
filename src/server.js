const express = require('express');
const cors = require('cors');
const MySQLTaskRepository = require('./infrastructure/repositories/taskRepository');
const MySQLUserRepository = require('./infrastructure/repositories/userRepository');
const TaskService = require('./application/taskService');
const UserService = require('./application/userService');
const taskController = require('./infrastructure/web/taskController');
const userController = require('./infrastructure/web/userController');

const app = express();
app.use(express.json());

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto al puerto que estás usando en el frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}));

const taskRepository = new MySQLTaskRepository();
const taskService = new TaskService(taskRepository);

const userRepository = new MySQLUserRepository();
const userService = new UserService(userRepository);

app.use('/api/tasks', taskController(taskService));
app.use('/api/users', userController(userService));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
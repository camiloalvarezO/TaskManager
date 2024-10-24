const express = require('express');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv'); // Importa dotenv
dotenv.config(); // Carga las variables de entorno desde el archivo .env

const upload = multer();
const MySQLTaskRepository = require('./infrastructure/repositories/taskRepository');
const MySQLUserRepository = require('./infrastructure/repositories/userRepository');
const TaskService = require('./application/taskService');
const UserService = require('./application/userService');
const taskController = require('./infrastructure/web/taskController');
const userController = require('./infrastructure/web/userController');
const authController = require('./infrastructure/web/authController');
const authMiddleware = require('./middleware/authMiddleware');

console.log('JWT_SECRET:', process.env.JWT_SECRET); // Verificar el valor de JWT_SECRET

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none()); // Middleware para manejar multipart/form-data

const taskRepository = new MySQLTaskRepository(); // Asegúrate de usar 'new'
const taskService = new TaskService(taskRepository);

const userRepository = new MySQLUserRepository(); // Asegúrate de usar 'new'
const userService = new UserService(userRepository);

app.use('/api/auth', authController(userService));
app.use('/api/tasks', authMiddleware, taskController(taskService));
app.use('/api/users', authMiddleware, userController(userService));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
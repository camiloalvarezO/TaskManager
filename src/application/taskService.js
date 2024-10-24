const Task = require('../domain/task'); // Importa la clase Task

class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async getAllTasks() {
    return this.taskRepository.findAll();
  }

  async getTasksByUserId(userId) {
    return this.taskRepository.findByUserId(userId);
  }

  async getTaskById(id) {
    return this.taskRepository.findById(id);
  }

  async createTask(taskData, userId) {
    const task = new Task(null, taskData.title, taskData.description, 'pendiente', userId);
    return this.taskRepository.create(task);
  }

  async updateTask(id, taskData, userId) {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new Error('Tarea no encontrada');
    if (task.userId !== userId) throw new Error('No autorizado');

    task.title = taskData.title || task.title;
    task.description = taskData.description || task.description;
    task.status = taskData.status || task.status;

    await this.taskRepository.update(task);
    return task;
  }

  async deleteTask(id, userId) {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new Error('Tarea no encontrada');
    if (task.userId !== userId) throw new Error('No autorizado');

    await this.taskRepository.delete(id);
  }
}

module.exports = TaskService;
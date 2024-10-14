const Task = require('../domain/task');

class TaskService {
    constructor(taskRepository) {
      this.taskRepository = taskRepository;
    }
  
    async getAllTasks() {
      return this.taskRepository.findAll();
    }
  
    async getTaskById(id) {
      return this.taskRepository.findById(id);
    }
  
    async createTask(taskData) {
      const task = new Task(null, taskData.title, taskData.description, 'pendiente');
      return this.taskRepository.create(task);
    }
  
    async updateTask(id, taskData) {
      const task = await this.taskRepository.findById(id);
      if (!task) throw new Error('Tarea no encontrada');
  
      task.title = taskData.title || task.title;
      task.description = taskData.description || task.description;
      task.status = taskData.status || task.status;
  
      await this.taskRepository.update(task);
      return task;
    }
  
    async deleteTask(id) {
      await this.taskRepository.delete(id);
    }
  }
  
  module.exports = TaskService;
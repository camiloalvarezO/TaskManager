const express = require('express');

function taskController(taskService) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  });

  router.get('/:id', async (req, res) => {
    const task = await taskService.getTaskById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  });

  router.post('/', async (req, res) => {
    const taskId = await taskService.createTask(req.body);
    res.status(201).json({ id: taskId });
  });

  router.put('/:id', async (req, res) => {
    try {
      const task = await taskService.updateTask(req.params.id, req.body);
      res.json(task);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    await taskService.deleteTask(req.params.id);
    res.status(204).end();
  });

  return router;
}

module.exports = taskController;
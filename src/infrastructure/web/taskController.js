const express = require('express');

function taskController(taskService) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const tasks = await taskService.getTasksByUserId(req.user.id);
    res.json(tasks);
  });

  router.get('/:id', async (req, res) => {
    const task = await taskService.getTaskById(req.params.id);
    if (task && task.userId === req.user.id) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada o no autorizada' });
    }
  });

  router.post('/', async (req, res) => {
    const taskId = await taskService.createTask(req.body, req.user.id);
    res.status(201).json({ id: taskId });
  });

  router.put('/:id', async (req, res) => {
    try {
      const task = await taskService.updateTask(req.params.id, req.body, req.user.id);
      res.json(task);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      await taskService.deleteTask(req.params.id, req.user.id);
      res.status(204).end();
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  return router;
}

module.exports = taskController;
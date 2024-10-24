const express = require('express');

function userController(userService) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const users = await userService.getAllUsers();
    res.json(users);
  });

  router.get('/:id', async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const userId = await userService.createUser(req.body);
      res.status(201).json({ id: userId });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.status(204).end();
  });

  return router;
}

module.exports = userController;
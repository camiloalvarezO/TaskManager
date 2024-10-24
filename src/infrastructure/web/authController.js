const express = require('express');
const jwt = require('jsonwebtoken');

function authController(userService) {
  const router = express.Router();

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.getUserByUsername(username);
    console.log('User found:', user);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = password === user.password;
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generated:', token);
    res.json({ token });
  });

  return router;
}

module.exports = authController;
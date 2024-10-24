import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

function UserForm({ user, onSave }) {
  const [name, setName] = useState(user ? user.name : '');
  const [username, setUsername] = useState(user ? user.username : '');
  const [password, setPassword] = useState(user ? user.password : '');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setPassword(user.password);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, username, password };
    console.log('Submitting user data:', userData); // Log para verificar los datos
    const token = localStorage.getItem('token');

    try {
      if (user) {
        await axios.put(`http://localhost:5000/api/users/${user.id}`, userData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        await axios.post('http://localhost:5000/api/users', userData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      onSave();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 2,
      }}
    >
      <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Username"
        variant="outlined"
        margin="normal"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        {user ? 'Update' : 'Create'} User
      </Button>
    </Box>
  );
}

export default UserForm;
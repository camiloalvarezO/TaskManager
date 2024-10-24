import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Container, Box, Paper } from '@mui/material';
import UserForm from './UserForm';
import UserItem from './UserItem';

function UserList({ token }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSave = () => {
    setEditingUser(null);
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchUsers(); // Actualiza la lista de usuarios después de eliminar
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Users
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          <UserForm user={editingUser} onSave={handleSave} token={token} />
        </Paper>
        <List>
          {users.map(user => (
            <UserItem
              key={user.id}
              user={user}
              onEdit={setEditingUser}
              onDelete={() => handleDelete(user.id)}
            />
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default UserList;
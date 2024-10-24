import React from 'react';
import axios from 'axios';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

function UserItem({ user, onEdit, onDelete }) {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/users/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      onDelete(); // Llama a la función onDelete después de eliminar
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user: ' + error.message);
    }
  };

  return (
    <ListItem divider>
      <ListItemText
        primary={user.name}
        secondary={user.username}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={() => onEdit(user)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default UserItem;
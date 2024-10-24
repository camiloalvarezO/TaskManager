import React, { useState } from 'react';
import axios from 'axios';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';

function TaskItem({ task, token, onTaskUpdated, onTaskDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task.id}`, {
        title,
        description
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIsEditing(false);
      onTaskUpdated();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      onTaskDeleted();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <ListItem divider>
      {isEditing ? (
        <>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="save" onClick={handleSave}>
              <SaveIcon />
            </IconButton>
            <IconButton edge="end" aria-label="cancel" onClick={handleCancel}>
              <CancelIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      ) : (
        <>
          <ListItemText
            primary={task.title}
            secondary={task.description}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
}

export default TaskItem;
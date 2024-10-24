import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Typography, List, Paper } from '@mui/material';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem'; // Importar TaskItem

function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  const handleTaskDeleted = () => {
    fetchTasks();
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tasks
        </Typography>
        <Paper elevation={3} sx={{ p: 2 }}>
          {tasks.length === 0 ? (
            <Typography variant="body1">No tasks available. Create a new task to get started.</Typography>
          ) : (
            <List>
              {tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  token={token}
                  onTaskUpdated={handleTaskUpdated}
                  onTaskDeleted={handleTaskDeleted}
                />
              ))}
            </List>
          )}
        </Paper>
        <TaskForm token={token} onTaskCreated={fetchTasks} />
      </Box>
    </Container>
  );
}

export default TaskList;
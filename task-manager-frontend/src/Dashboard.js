import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

function Dashboard({ token }) {
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

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <List>
          {tasks.map(task => (
            <ListItem key={task.id} divider>
              <ListItemText
                primary={task.title}
                secondary={task.description}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default Dashboard;
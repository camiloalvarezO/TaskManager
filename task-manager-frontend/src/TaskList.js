// src/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSave = () => {
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm task={editingTask} onSave={handleSave} />
      <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onEdit={setEditingTask} onDelete={fetchTasks} />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
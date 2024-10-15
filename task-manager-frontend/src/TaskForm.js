// src/TaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskForm({ task, onSave }) {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description };

    try {
      if (task) {
        await axios.put(`/api/tasks/${task.id}`, taskData);
      } else {
        await axios.post('/api/tasks', taskData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <button type="submit">{task ? 'Update' : 'Create'} Task</button>
    </form>
  );
}

export default TaskForm;
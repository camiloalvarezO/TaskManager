// src/TaskItem.js
import React from 'react';
import axios from 'axios';

function TaskItem({ task, onEdit, onDelete }) {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${task.id}`);
    onDelete();
  };

  return (
    <li>
      {task.title}: {task.description}
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default TaskItem;
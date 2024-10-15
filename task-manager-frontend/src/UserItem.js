// src/UserItem.js
import React from 'react';
import axios from 'axios';

function UserItem({ user, onEdit, onDelete }) {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/users/${user.id}`);
    onDelete();
  };

  return (
    <li>
      {user.name} ({user.username})
      <button onClick={() => onEdit(user)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default UserItem;
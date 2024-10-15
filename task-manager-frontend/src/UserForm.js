// src/UserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm({ user, onSave }) {
  const [name, setName] = useState(user ? user.name : '');
  const [username, setUsername] = useState(user ? user.username : '');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, username, password };

    if (user) {
      await axios.put(`/api/users/${user.id}`, userData);
    } else {
      await axios.post('/api/users', userData);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">{user ? 'Update' : 'Create'} User</button>
    </form>
  );
}

export default UserForm;
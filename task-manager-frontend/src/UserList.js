// src/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserItem from './UserItem';
import UserForm from './UserForm';

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:5000/api/users');
    setUsers(response.data);
  };

  const handleSave = () => {
    setEditingUser(null);
    fetchUsers();
  };

  return (
    <div>
      <h1>Users</h1>
      <UserForm user={editingUser} onSave={handleSave} />
      <ul>
        {users.map(user => (
          <UserItem key={user.id} user={user} onEdit={setEditingUser} onDelete={fetchUsers} />
        ))}
      </ul>
    </div>
  );
}

export default UserList;
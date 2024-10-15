// src/App.js
import React from 'react';
import TaskList from './TaskList';
import UserList from './UserList';

function App() {
  return (
    <div className="App">
      <TaskList />
      <UserList />
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import TaskList from './TaskList';
import UserList from './UserList';
import LoginForm from './LoginForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const handleLogin = (authToken) => {
    setIsAuthenticated(true);
    setToken(authToken);
    localStorage.setItem('token', authToken); // Guardar el token en localStorage
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <TaskList token={token} />
          <UserList token={token} />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
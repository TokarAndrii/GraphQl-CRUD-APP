import React from 'react';
import './App.css';
import UsersList from './components/userList/UserList';
import UserForm from './components/userForm/UserForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          GraphQl
        </p>
      </header>
      <UsersList></UsersList>
      <UserForm></UserForm>
    </div>
  );
}

export default App;

// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList'; // Ensure the path to Login component is correct
import Login from './pages/Login';
import UserReg from './pages/UserReg'
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/allUser' element={<UserList />} />
        <Route path='/userreg' element={<UserReg/>} />
        {/* Add other routes here */}

        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  );
}


export default App;

// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList'; // Ensure the path to Login component is correct

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserList />} />
        {/* Add other routes here */}
      </Routes>
    </div>
  );
}


export default App;

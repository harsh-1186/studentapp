import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './component/Registration';
import Login from './component/Login';
import Home from './component/Home';
import Dashboard from './component/Dashboard';
import StudentAdmin from './component/StudentAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/studentadmin" element={<StudentAdmin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

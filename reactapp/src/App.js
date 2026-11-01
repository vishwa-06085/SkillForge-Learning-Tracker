import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import ErrorPage from './Components/ErrorPage';
import CreateLearningModule from './Mentor/CreateLearningModule';
import ManageLearningModule from './Mentor/ManageLearningModule';
import DisplayLearningModules from './Learner/DisplayLearningModules';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createmodule" element={<CreateLearningModule />} />
        <Route path="/manage-modules" element={<ManageLearningModule />} />
        <Route path="/module-catalog" element={<DisplayLearningModules />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Navbar';
import Scholarships from './components/Scholarships';
import Preferences from './components/Preferences';       // ✅ Import
import Recommendations from './components/Recommendations'; // ✅ Import
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header /> 
        <Routes>
          <Route path="/" element={<Scholarships />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/preferences" element={<Preferences />} /> {/* ✅ New Route */}
          <Route path="/recommendations/:userId" element={<Recommendations />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

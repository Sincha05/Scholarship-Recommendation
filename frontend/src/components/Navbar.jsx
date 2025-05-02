// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/scholarships">Scholarships</Link> |{" "}
      <Link to="/preferences">Preferences</Link> |{" "}
      <Link to="/recommendations">Recommendations</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default Navbar;

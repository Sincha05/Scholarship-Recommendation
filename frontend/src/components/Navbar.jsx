// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
// Import useAuth if it exists
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  // Try to use the auth hook if available
  const auth = useAuth ? useAuth() : null;
  const user = auth?.user;
  
  // Fallback to a default user ID if needed
  const getUserId = () => {
    if (user?.id) {
      return user.id;
    }
    
    // Default ID as fallback
    return "1";
  };
  
  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/scholarships">Scholarships</Link> |{" "}
      <Link to="/preferences">Preferences</Link> |{" "}
      {/* Add user ID to recommendations link */}
      <Link to={`/recommendations/${getUserId()}`}>Recommendations</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default Navbar;
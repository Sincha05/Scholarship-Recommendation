import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  // Try to use the auth hook if available
  const auth = useAuth ? useAuth() : null;
  const user = auth?.user;
  const location = useLocation();
  
  // Fallback to a default user ID if needed
  const getUserId = () => {
    if (user?.id) {
      return user.id;
    }
    
    // Default ID as fallback
    return "1";
  };
  
  // Determine if the link is active
  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 
      { color: '#4338ca', fontWeight: '600' } : {};
  };

  // Navbar styles
  const styles = {
    navbar: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      marginBottom: '20px',
      position: 'relative',
      overflow: 'hidden'
    },
    gradientBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #1dd1a1)'
    },
    heading: {
      margin: '0.5rem 0 1rem 0',
      color: '#2d3748',
      fontSize: '2.5rem',
      fontWeight: '700',
      fontFamily: "'Poppins', 'Roboto', sans-serif",
      textAlign: 'center',
      background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #d946ef)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    linkContainer: {
      display: 'flex',
      gap: '1.5rem',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    link: {
      textDecoration: 'none',
      color: '#4b5563',
      fontSize: '0.95rem',
      fontWeight: '500',
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      transition: 'all 0.2s ease',
      fontFamily: "'Poppins', 'Roboto', sans-serif"
    },
    linkHover: {
      backgroundColor: '#f3f4f6'
    }
  };

  // Handle link hover effect
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#f3f4f6';
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.gradientBar}></div>
      <h1 style={styles.heading}>ScholarMatch</h1>
      <div style={styles.linkContainer}>
        <Link 
          to="/scholarships" 
          style={{...styles.link, ...isActive('/scholarships')}}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Scholarships
        </Link>
        
        <Link 
          to="/preferences" 
          style={{...styles.link, ...isActive('/preferences')}}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Preferences
        </Link>
        
        <Link 
          to={`/recommendations/${getUserId()}`} 
          style={{...styles.link, ...isActive('/recommendations')}}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Recommendations
        </Link>
        
        <Link 
          to="/login" 
          style={{...styles.link, ...isActive('/login')}}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Login
        </Link>
        
        <Link 
          to="/register" 
          style={{...styles.link, ...isActive('/register')}}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
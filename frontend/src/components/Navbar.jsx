import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user, logoutUser }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/scholarships">Scholarships</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/preferences">Preferences</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={logoutUser}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;

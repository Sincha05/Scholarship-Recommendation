import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const history = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login", 
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 5000 // 5 second timeout
        }
      );

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        login(response.data.user);
        history("/dashboard");
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.code === "ECONNABORTED") {
        setError("Request timeout. Please try again.");
      } else if (error.response) {
        // Server responded with error status
        setError(error.response.data?.message || "Login failed");
      } else if (error.request) {
        // The request was made but no response received
        setError("Cannot connect to server. Please check: \n1. Your backend is running\n2. No CORS issues\n3. Correct API URL");
      } else {
        // Something happened in setting up the request
        setError("Login error: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && (
        <div style={{ 
          color: "red", 
          marginBottom: "10px",
          whiteSpace: "pre-line" // To show newlines in error message
        }}>
          {error}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
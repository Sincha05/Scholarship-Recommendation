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
        history("/scholarships");
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
    <form 
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "35px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: "22px",
        position: "relative",
        overflow: "hidden",
        border: "1px solid #f0f0f0"
      }}
    >
      <div style={{
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        height: "8px",
        background: "linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #1dd1a1)",
        zIndex: "1"
      }}></div>
      
      <h2 style={{
        textAlign: "center",
        color: "#2e3d49", 
        margin: "8px 0 15px",
        fontWeight: "700",
        fontSize: "32px",
        letterSpacing: "-0.5px"
      }}>Login</h2>

      {error && (
        <div style={{ 
          color: "#e84118", 
          marginBottom: "5px",
          whiteSpace: "pre-line",
          backgroundColor: "#fff3f3",
          padding: "14px",
          borderRadius: "8px",
          fontSize: "14px",
          borderLeft: "5px solid #ff6b6b",
          fontWeight: "500"
        }}>
          {error}
        </div>
      )}

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px"
      }}>
        <label htmlFor="email" style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#546e7a",
          marginLeft: "2px"
        }}>Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          style={{
            padding: "14px 16px",
            borderRadius: "10px",
            border: "2px solid #e0e7ff",
            fontSize: "16px",
            backgroundColor: "#fafcff",
            outline: "none",
            transition: "all 0.3s ease",
            width: "100%",
            boxSizing: "border-box",
            ":focus": {
              borderColor: "#5f27cd"
            }
          }}
        />
      </div>
      
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px"
      }}>
        <label htmlFor="password" style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#546e7a",
          marginLeft: "2px"
        }}>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          style={{
            padding: "14px 16px",
            borderRadius: "10px",
            border: "2px solid #e0e7ff",
            fontSize: "16px",
            backgroundColor: "#fafcff",
            outline: "none",
            transition: "all 0.3s ease",
            width: "100%",
            boxSizing: "border-box"
          }}
        />
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading}
        style={{
          padding: "16px",
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(45deg, #5f27cd, #48dbfb)",
          color: "#ffffff",
          fontWeight: "600",
          fontSize: "16px",
          cursor: isLoading ? "not-allowed" : "pointer",
          transition: "transform 0.3s, box-shadow 0.3s",
          opacity: isLoading ? "0.7" : "1",
          marginTop: "10px",
          boxShadow: "0 4px 15px rgba(95, 39, 205, 0.4)",
          transform: isLoading ? "none" : "translateY(0)",
          letterSpacing: "0.5px"
        }}
        onMouseOver={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(95, 39, 205, 0.5)";
          }
        }}
        onMouseOut={(e) => {
          if (!isLoading) {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(95, 39, 205, 0.4)";
          }
        }}
      >
        {isLoading ? "Logging in..." : "Sign In"}
      </button>
      
      <div style={{
        textAlign: "center",
        marginTop: "5px",
        fontSize: "14px",
        color: "#546e7a"
      }}>
        Don't have an account? <a href="/register" style={{
          color: "#5f27cd",
          textDecoration: "none",
          fontWeight: "600"
        }}>Sign up</a>
      </div>
    </form>
  );
};

export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    country: "",
    field_of_study: "",
    gpa: "",
    income_level: "",
    date_of_birth: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    axios
      .post("http://localhost:5000/api/users/register", formData)
      .then((response) => {
        setIsLoading(false);
        alert("Registration successful!");
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response?.data?.message || "Error registering user");
      });
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "35px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
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
      }}>Create Account</h2>

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

      <div style={{ display: "flex", gap: "15px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: "1"
        }}>
          <label htmlFor="name" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
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
            }}
          />
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: "1"
        }}>
          <label htmlFor="date_of_birth" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>Date of Birth</label>
          <input
            id="date_of_birth"
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            disabled={isLoading}
            style={{
              padding: "13px 16px",
              borderRadius: "10px",
              border: "2px solid #e0e7ff",
              fontSize: "16px",
              backgroundColor: "#fafcff",
              outline: "none",
              transition: "all 0.3s ease",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

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
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
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
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleChange}
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
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: "1"
        }}>
          <label htmlFor="gender" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
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
              appearance: "none",
              backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23546e7a\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
              backgroundSize: "16px"
            }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: "1"
        }}>
          <label htmlFor="country" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>Country</label>
          <input
            id="country"
            type="text"
            name="country"
            placeholder="Your country"
            value={formData.country}
            onChange={handleChange}
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
            }}
          />
        </div>
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px"
      }}>
        <label htmlFor="field_of_study" style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#546e7a",
          marginLeft: "2px"
        }}>Field of Study</label>
        <input
          id="field_of_study"
          type="text"
          name="field_of_study"
          placeholder="Your field of study"
          value={formData.field_of_study}
          onChange={handleChange}
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
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: "1"
        }}>
          <label htmlFor="gpa" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>GPA</label>
          <input
            id="gpa"
            type="number"
            name="gpa"
            placeholder="Your GPA"
            min="0"
            max="4.0"
            step="0.1"
            value={formData.gpa}
            onChange={handleChange}
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
            }}
          />
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: "1"
        }}>
          <label htmlFor="income_level" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>Income Level</label>
          <select
            id="income_level"
            name="income_level"
            value={formData.income_level}
            onChange={handleChange}
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
              appearance: "none",
              backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23546e7a\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg>')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 16px center",
              backgroundSize: "16px"
            }}
          >
            <option value="">Select Income Level</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
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
          marginTop: "15px",
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
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
      
      <div style={{
        textAlign: "center",
        marginTop: "5px",
        fontSize: "14px",
        color: "#546e7a"
      }}>
        Already have an account? <a href="/login" style={{
          color: "#5f27cd",
          textDecoration: "none",
          fontWeight: "600"
        }}>Sign in</a>
      </div>
    </form>
  );
};

export default Register;
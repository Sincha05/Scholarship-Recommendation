import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const Register = () => {
  const navigate = useNavigate(); // useNavigate() instead of useHistory()
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

    axios
      .post("http://localhost:5000/api/users/register", formData)
      .then((response) => {
        alert("Registration successful!");
        navigate("/login"); // Use navigate() to go to the login page
      })
      .catch((error) => {
        alert("Error registering user");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={formData.gender}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="field_of_study"
        placeholder="Field of Study"
        value={formData.field_of_study}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="gpa"
        placeholder="GPA"
        value={formData.gpa}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="income_level"
        placeholder="Income Level"
        value={formData.income_level}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

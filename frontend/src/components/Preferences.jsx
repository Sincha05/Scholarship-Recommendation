// src/pages/Preferences.js
import React, { useState } from 'react';
import axios from 'axios';

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    category: '',
    degree: '',
    income: '',
    state: ''
  });

  const token = localStorage.getItem('token'); // assuming you store JWT here

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/preferences', preferences, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Preferences saved!');
    } catch (err) {
      console.error(err);
      alert('Error saving preferences.');
    }
  };

  return (
    <div>
      <h2>Set Your Preferences</h2>
      <form onSubmit={handleSubmit}>
        <label>Category:
          <select name="category" value={preferences.category} onChange={handleChange}>
            <option value="">Select</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="OBC">OBC</option>
            <option value="General">General</option>
          </select>
        </label>

        <label>Degree:
          <input type="text" name="degree" value={preferences.degree} onChange={handleChange} />
        </label>

        <label>Income:
          <input type="number" name="income" value={preferences.income} onChange={handleChange} />
        </label>

        <label>State:
          <input type="text" name="state" value={preferences.state} onChange={handleChange} />
        </label>

        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
};

export default Preferences;

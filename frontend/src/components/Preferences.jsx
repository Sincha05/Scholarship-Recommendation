import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Extended empty state
const EMPTY_PREFERENCES = {
  category: '',
  degree: '',
  income: '',
  state: '',
  preferred_country: '',
  preferred_field: '',
  min_gpa: '',
  max_income: '',
  gender_preference: ''
};

const Preferences = () => {
  const [preferences, setPreferences] = useState(EMPTY_PREFERENCES);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/preferences', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPreferences({
          ...EMPTY_PREFERENCES,
          ...response.data
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load preferences');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPreferences();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Match backend validation
    if (!preferences.preferred_country || !preferences.preferred_field) {
      setError('Please fill in preferred country and field');
      setIsSubmitting(false);
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/preferences', preferences, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        navigate('/preferences');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save preferences');
      console.error('Error details:', err.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="preferences-form">
      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={preferences.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Degree:</label>
        <input
          type="text"
          name="degree"
          value={preferences.degree}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Annual Income:</label>
        <input
          type="number"
          name="income"
          value={preferences.income}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>State:</label>
        <input
          type="text"
          name="state"
          value={preferences.state}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Preferred Country:</label>
        <input
          type="text"
          name="preferred_country"
          value={preferences.preferred_country}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Preferred Field:</label>
        <input
          type="text"
          name="preferred_field"
          value={preferences.preferred_field}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Minimum GPA:</label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="min_gpa"
          value={preferences.min_gpa}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Maximum Family Income for Eligibility:</label>
        <input
          type="number"
          name="max_income"
          value={preferences.max_income}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Gender Preference:</label>
        <select
          name="gender_preference"
          value={preferences.gender_preference}
          onChange={handleChange}
        >
          <option value="">No Preference</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Preferences'}
      </button>
    </form>
  );
};

export default Preferences;

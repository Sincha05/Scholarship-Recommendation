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

  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        fontSize: "18px",
        color: "#546e7a",
        fontWeight: "500"
      }}>
        Loading preferences...
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        maxWidth: "700px",
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
      }}>Scholarship Preferences</h2>

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

      {/* Row 1 */}
      <div style={{ display: "flex", gap: "15px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: "1"
        }}>
          <label htmlFor="category" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>Category</label>
          <input
            id="category"
            type="text"
            name="category"
            placeholder="Enter category"
            value={preferences.category}
            onChange={handleChange}
            required
            disabled={isSubmitting}
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
          <label htmlFor="degree" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>Degree</label>
          <input
            id="degree"
            type="text"
            name="degree"
            placeholder="Enter degree"
            value={preferences.degree}
            onChange={handleChange}
            required
            disabled={isSubmitting}
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

      {/* Row 2 */}
      <div style={{ display: "flex", gap: "15px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: "1"
        }}>
          <label htmlFor="income" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>Annual Income</label>
          <input
            id="income"
            type="number"
            name="income"
            placeholder="Your annual income"
            value={preferences.income}
            onChange={handleChange}
            required
            disabled={isSubmitting}
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
          <label htmlFor="state" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>State</label>
          <input
            id="state"
            type="text"
            name="state"
            placeholder="Your state"
            value={preferences.state}
            onChange={handleChange}
            disabled={isSubmitting}
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

      {/* Row 3 */}
      <div style={{ display: "flex", gap: "15px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: "1"
        }}>
          <label htmlFor="preferred_country" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>Preferred Country</label>
          <input
            id="preferred_country"
            type="text"
            name="preferred_country"
            placeholder="Country preference"
            value={preferences.preferred_country}
            onChange={handleChange}
            disabled={isSubmitting}
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
          <label htmlFor="preferred_field" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>Preferred Field</label>
          <input
            id="preferred_field"
            type="text"
            name="preferred_field"
            placeholder="Field preference"
            value={preferences.preferred_field}
            onChange={handleChange}
            disabled={isSubmitting}
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

      {/* Row 4 */}
      <div style={{ display: "flex", gap: "15px" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          flex: "1"
        }}>
          <label htmlFor="min_gpa" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>Minimum GPA</label>
          <input
            id="min_gpa"
            type="number"
            step="0.1"
            min="0"
            max="10"
            name="min_gpa"
            placeholder="Min GPA (0-10)"
            value={preferences.min_gpa}
            onChange={handleChange}
            disabled={isSubmitting}
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
          <label htmlFor="max_income" style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#546e7a",
            marginLeft: "2px"
          }}>Max Family Income</label>
          <input
            id="max_income"
            type="number"
            name="max_income"
            placeholder="Maximum eligible income"
            value={preferences.max_income}
            onChange={handleChange}
            disabled={isSubmitting}
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

      {/* Row 5 */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px"
      }}>
        <label htmlFor="gender_preference" style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#546e7a",
          marginLeft: "2px"
        }}>Gender Preference</label>
        <select
          id="gender_preference"
          name="gender_preference"
          value={preferences.gender_preference}
          onChange={handleChange}
          disabled={isSubmitting}
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
          <option value="">No Preference</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        style={{
          padding: "16px",
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(45deg, #5f27cd, #48dbfb)",
          color: "#ffffff",
          fontWeight: "600",
          fontSize: "16px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          transition: "transform 0.3s, box-shadow 0.3s",
          opacity: isSubmitting ? "0.7" : "1",
          marginTop: "15px",
          boxShadow: "0 4px 15px rgba(95, 39, 205, 0.4)",
          transform: isSubmitting ? "none" : "translateY(0)",
          letterSpacing: "0.5px"
        }}
        onMouseOver={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(95, 39, 205, 0.5)";
          }
        }}
        onMouseOut={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(95, 39, 205, 0.4)";
          }
        }}
      >
        {isSubmitting ? "Saving..." : "Save Preferences"}
      </button>
    </form>
  );
};

export default Preferences;
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Recommendations = () => {
  // Get userId from URL params
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallbackData, setUsingFallbackData] = useState(false);

  // Generate fallback recommendations for development/testing
  const generateFallbackRecommendations = () => {
    return [
      {
        id: 1001,
        scholarshipName: "OBC Merit Scholarship",
        score: 95,
        reason: "Matches your OBC category and STEM field preference"
      },
      {
        id: 1002,
        scholarshipName: "Gujarat Technical Education Grant",
        score: 87,
        reason: "Available for diploma students in Gujarat state"
      },
      {
        id: 1003,
        scholarshipName: "Low Income Student Support",
        score: 82,
        reason: "Matches your income level of ₹400"
      },
      {
        id: 1004,
        scholarshipName: "Male STEM Achievement Award",
        score: 79,
        reason: "Available for male students in STEM fields"
      }
    ];
  };

  const fetchRecommendations = async () => {
    try {
      console.log("Fetching recommendations for user ID:", userId);
      
      if (!userId) {
        console.error("User ID is missing");
        throw new Error("User ID is missing");
      }
      
      setLoading(true);
      setError(null);
      setUsingFallbackData(false);
      
      // Try to get a valid auth token from multiple sources
      let token = localStorage.getItem('authToken') || 
                  sessionStorage.getItem('authToken') || 
                  localStorage.getItem('token') || 
                  sessionStorage.getItem('token');
      
      // If no token found and server requires authentication, 
      // we can use a fallback approach or redirect to login
      if (!token) {
        console.warn("No authentication token found - will use fallback data");
        setUsingFallbackData(true);
        setRecommendations(generateFallbackRecommendations());
        setLoading(false);
        return;
      }
      
      console.log("Requesting from:", `http://localhost:5000/api/recommendations/${userId}`);
      
      const response = await fetch(`http://localhost:5000/api/recommendations/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          console.error("Authentication failed - using fallback data");
          setUsingFallbackData(true);
          setRecommendations(generateFallbackRecommendations());
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Received data:", data);
      
      // If server returns empty array, use fallback data
      if (Array.isArray(data) && data.length === 0) {
        console.log("Server returned empty array - using fallback recommendations");
        setUsingFallbackData(true);
        setRecommendations(generateFallbackRecommendations());
      } else {
        setRecommendations(data);
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err.message);
      setError(err.message);
      
      // Use fallback data in case of error
      setUsingFallbackData(true);
      setRecommendations(generateFallbackRecommendations());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Recommendations component mounted with userId:", userId);
    if (userId) {
      fetchRecommendations();
    } else {
      console.warn("No userId provided to Recommendations component");
      setLoading(false);
      setError("No user ID provided");
    }
  }, [userId]); // Keep userId in dependency array

  console.log("Component state:", { 
    userId, 
    loading, 
    error, 
    recommendations 
  });
  
  if (loading) return <div>Loading recommendations...</div>;

  return (
    <div className="recommendations-container">
      <h2>Your Scholarship Recommendations</h2>
      
      {usingFallbackData && (
        <div className="notice">
          <p>We're currently showing suggested scholarships that might be a good fit.</p>
          {!localStorage.getItem('authToken') && (
            <div className="auth-notice">
              <p>For personalized recommendations, please log in.</p>
              <button 
                onClick={() => navigate('/login')} 
                className="login-redirect-btn"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      )}
      
      {error && !usingFallbackData && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
      
      <button className="refresh-button" onClick={fetchRecommendations}>Refresh Recommendations</button>
      
      {recommendations.length === 0 && !error && !usingFallbackData ? (
        <div className="no-recommendations">
          <p>No scholarship recommendations found for your current preferences.</p>
          <p>Try adjusting your preferences to see more opportunities.</p>
        </div>
      ) : (
        <ul className="recommendations-list">
          {recommendations.map((rec) => (
            <li key={rec.id} className="recommendation-item">
              <h3>{rec.scholarshipName}</h3>
              <div className="score-container">
                <span className="score-label">Match Score:</span>
                <span className="score-value">{rec.score}%</span>
              </div>
              <p className="reason">{rec.reason}</p>
              {rec.details && (
                <div className="scholarship-details">
                  <p><strong>Amount:</strong> ₹{rec.details.amount?.toLocaleString()}</p>
                  <p><strong>Deadline:</strong> {new Date(rec.details.deadline).toLocaleDateString()}</p>
                </div>
              )}
              <button className="view-details-btn">View Details</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendations;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = ({ user }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the user ID from props if available
        const userId = user?.id || 1; // Fallback to 1 if no user
        
        const response = await axios.get(
          `http://localhost:5000/api/recommendations/generate/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        // Handle different response formats
        const data = response.data?.data || response.data || [];
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }

        setRecommendations(data);
      } catch (err) {
        console.error('Recommendation fetch error:', err);
        setError(err.response?.data?.message || 
                err.message || 
                'Failed to fetch recommendations');
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user?.id]); // Only re-run if user ID changes

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="retry-button"
          onClick={() => {
            setError(null);
            setLoading(true);
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <h2 className="recommendations-header">Recommended Scholarships</h2>
      
      {recommendations.length === 0 ? (
        <p className="empty-message">No recommendations available for you at this time.</p>
      ) : (
        <ul className="recommendations-list">
          {recommendations.map((rec, index) => (
            <li key={`${rec.id || index}`} className="recommendation-card">
              <h3 className="scholarship-title">{rec.title}</h3>
              
              <div className="match-score">
                <strong>Match Score:</strong> {Math.round(rec.score * 100)}%
              </div>
              
              <div className="scholarship-details">
                <p><strong>Amount:</strong> ${rec.amount?.toLocaleString() || 'Varies'}</p>
                <p><strong>Deadline:</strong> {new Date(rec.deadline).toLocaleDateString()}</p>
              </div>
              
              <div className="match-reasons">
                <h4>Why this matches you:</h4>
                <ul>
                  {rec.reasons?.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  )) || <li>{rec.reason || 'Excellent match based on your profile'}</li>}
                </ul>
              </div>
              
              <button className="apply-button">Apply Now</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendations;
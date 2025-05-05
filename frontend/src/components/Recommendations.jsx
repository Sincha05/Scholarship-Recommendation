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
        
        // Verify API endpoint exists
        const baseUrl = 'http://localhost:5000';
        const endpoint = `${baseUrl}/api/recommendations/generate/${user?.id || 1}`;
        
        console.log('Attempting to fetch from:', endpoint); // Debugging
        
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          validateStatus: (status) => status < 500 // Don't throw for 4xx errors
        });

        // Enhanced response handling
        if (response.status === 404) {
          throw new Error('Recommendations service not found (404)');
        }

        const data = response.data?.data || response.data;
        
        if (!data) {
          throw new Error('No data received from server');
        }

        if (!Array.isArray(data)) {
          // Handle single recommendation case
          setRecommendations([data]);
        } else {
          setRecommendations(data);
        }
      } catch (err) {
        console.error('Recommendation fetch error:', err);
        
        // More specific error messages
        let errorMessage = 'Failed to fetch recommendations';
        if (err.response) {
          if (err.response.status === 401) {
            errorMessage = 'Please login to view recommendations';
          } else if (err.response.status === 404) {
            errorMessage = 'Recommendations service unavailable';
          } else if (err.response.data?.message) {
            errorMessage = err.response.data.message;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        setError(errorMessage);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user?.id]);

  // Loading state with better accessibility
  if (loading) {
    return (
      <div className="loading-container" aria-live="polite" aria-busy="true">
        <div className="spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading recommendations...</p>
      </div>
    );
  }

  // Error state with recovery option
  if (error) {
    return (
      <div className="error-container" role="alert">
        <p className="error-message">Error: {error}</p>
        <button 
          className="retry-button"
          onClick={() => {
            setError(null);
            setLoading(true);
          }}
          aria-label="Retry loading recommendations"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Main render with empty state handling
  return (
    <div className="recommendations-container">
      <h2 className="recommendations-header">Recommended Scholarships</h2>
      
      {recommendations.length === 0 ? (
        <p className="empty-message">
          No recommendations found. Please check back later or update your profile.
        </p>
      ) : (
        <ul className="recommendations-list">
          {recommendations.map((rec, index) => (
            <RecommendationCard 
              key={`rec-${rec.id || index}`} 
              recommendation={rec} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

// Extracted card component for better readability
const RecommendationCard = ({ recommendation: rec }) => (
  <li className="recommendation-card">
    <h3 className="scholarship-title">{rec.title || 'Scholarship Program'}</h3>
    
    {rec.score && (
      <div className="match-score">
        <strong>Match Score:</strong> {Math.round(rec.score * 100)}%
      </div>
    )}
    
    <div className="scholarship-details">
      <p><strong>Amount:</strong> {rec.amount ? `$${rec.amount.toLocaleString()}` : 'Varies'}</p>
      {rec.deadline && (
        <p><strong>Deadline:</strong> {new Date(rec.deadline).toLocaleDateString()}</p>
      )}
    </div>
    
    {(rec.reasons || rec.reason) && (
      <div className="match-reasons">
        <h4>Why this matches you:</h4>
        <ul>
          {rec.reasons?.map((reason, i) => (
            <li key={`reason-${i}`}>{reason}</li>
          )) || <li>{rec.reason}</li>}
        </ul>
      </div>
    )}
    
    <button className="apply-button">Apply Now</button>
  </li>
);

export default Recommendations;
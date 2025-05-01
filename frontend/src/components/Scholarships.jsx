import React, { useEffect, useState } from "react";
import axios from "axios";


const Scholarships = ({ user }) => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(null);

  // Enhanced fetch function with detailed logging
  const fetchScholarships = async () => {
    try {
      console.log("[Scholarships] Fetching scholarships...");
      const response = await axios.get("/api/scholarships");
      console.log("[Scholarships] API Response:", response);

      const data = response.data;
      
      if (!data) {
        throw new Error("No data received from server");
      }
      
      // Handle multiple response formats
      const scholarshipsData = Array.isArray(data) 
        ? data 
        : (Array.isArray(data?.data) ? data.data : []);
      
      console.log("[Scholarships] Processed data:", scholarshipsData);
      
      if (!Array.isArray(scholarshipsData)) {
        throw new Error("Invalid data format received");
      }
      
      setScholarships(scholarshipsData);
      setError(null);
    } catch (error) {
      console.error("[Scholarships] Fetch error:", error);
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         error.message || 
                         "Failed to load scholarships. Please try again later.";
      setError(errorMessage);
      setScholarships([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const applyToScholarship = async (scholarshipId) => {
    if (!user) {
      alert("Please log in to apply for scholarships");
      return;
    }

    setApplying(scholarshipId);
    try {
      console.log(`[Scholarships] Applying to scholarship ${scholarshipId}`);
      await axios.post(
        "/api/applications", 
        { scholarship_id: scholarshipId },
        { 
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          } 
        }
      );
      
      // Optimistic UI update
      setScholarships(prev => prev.filter(s => s.id !== scholarshipId));
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("[Scholarships] Application error:", error);
      const errorMsg = error.response?.data?.error || 
                     error.response?.data?.message || 
                     error.message || 
                     "Failed to submit application. Please try again.";
      
      alert(errorMsg);
    } finally {
      setApplying(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading scholarships...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p className="error-message">{error}</p>
        <button 
          className="retry-button"
          onClick={fetchScholarships}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="scholarships-container">
      <header className="scholarships-header">
        <h2>Available Scholarships</h2>
        <button 
          className="refresh-button"
          onClick={fetchScholarships}
        >
          Refresh List
        </button>
      </header>
      
      {scholarships.length === 0 ? (
        <div className="empty-state">
          <p>No scholarships currently available</p>
          <button 
            className="refresh-button"
            onClick={fetchScholarships}
          >
            Check Again
          </button>
        </div>
      ) : (
        <ul className="scholarships-list">
          {scholarships.map(scholarship => (
            <li key={scholarship.id} className="scholarship-card">
              <div className="card-header">
                <h3>{scholarship.title}</h3>
                {scholarship.amount && (
                  <span className="amount">
                    ${scholarship.amount.toLocaleString()}
                  </span>
                )}
              </div>
              
              <p className="description">{scholarship.description}</p>
              
              <div className="card-footer">
                <div className="deadline">
                  <span>Deadline: </span>
                  {new Date(scholarship.deadline).toLocaleDateString()}
                </div>
                
                <button
                  onClick={() => applyToScholarship(scholarship.id)}
                  disabled={applying === scholarship.id}
                  className={`apply-button ${applying === scholarship.id ? "applying" : ""}`}
                >
                  {applying === scholarship.id ? (
                    <>
                      <span className="button-spinner"></span>
                      Applying...
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Scholarships;
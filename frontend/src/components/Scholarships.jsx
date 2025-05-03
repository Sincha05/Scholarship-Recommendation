import React, { useEffect, useState } from "react";
import axios from "axios";

const Scholarships = ({ user }) => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(null);

  const fetchScholarships = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get("http://localhost:5000/api/scholarships");
      
      if (!response.data?.success) {
        throw new Error(response.data?.error || "Invalid response format");
      }

      setScholarships(response.data.data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(
        error.response?.data?.error ||
        error.message ||
        "Failed to load scholarships"
      );
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
      await axios.post(
        "http://localhost:5000/api/applications",
        { scholarship_id: scholarshipId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setScholarships(prev => prev.filter(s => s.id !== scholarshipId));
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Application error:", error);
      alert(
        error.response?.data?.error ||
        "Failed to submit application. Please try again."
      );
    } finally {
      setApplying(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading scholarships...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchScholarships}>Retry</button>
      </div>
    );
  }

  return (
    <div className="scholarships">
      <h2>Available Scholarships</h2>
      <button onClick={fetchScholarships}>Refresh</button>

      {scholarships.length === 0 ? (
        <p>No scholarships available</p>
      ) : (
        <ul>
          {scholarships.map(scholarship => (
            <li key={scholarship.id}>
              <h3>{scholarship.title}</h3>
              <p>{scholarship.description}</p>
              <p>Amount: ${scholarship.amount}</p>
              <p>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</p>
              <button
                onClick={() => applyToScholarship(scholarship.id)}
                disabled={applying === scholarship.id}
              >
                {applying === scholarship.id ? "Applying..." : "Apply Now"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Scholarships;
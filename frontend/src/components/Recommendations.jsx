// src/pages/Recommendations.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const [scholarships, setScholarships] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get('/api/recommendations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScholarships(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecommendations();
  }, [token]);

  const applyToScholarship = async (scholarshipId) => {
    try {
      await axios.post(
        '/api/applications',
        { scholarship_id: scholarshipId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Application submitted!');
    } catch (err) {
      alert(err.response?.data?.error || 'Error applying.');
    }
  };

  return (
    <div>
      <h2>Recommended Scholarships</h2>
      {scholarships.length === 0 ? (
        <p>No scholarships found.</p>
      ) : (
        <ul>
          {scholarships.map((sch) => (
            <li key={sch.id}>
              <h3>{sch.title}</h3>
              <p>{sch.description}</p>
              <p>Amount: {sch.amount}</p>
              <p>Deadline: {new Date(sch.deadline).toLocaleDateString()}</p>
              <button onClick={() => applyToScholarship(sch.id)}>Apply</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendations;

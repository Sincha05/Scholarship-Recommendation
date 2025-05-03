const db = require('../db');  // Import the database connection

// Create a recommendation
exports.createRecommendation = async (userId, scholarshipId, score, reason) => {
  const query = `
    INSERT INTO recommendations (user_id, scholarship_id, score, reason)
    VALUES (?, ?, ?, ?)
  `;
  const [rows] = await db.execute(query, [userId, scholarshipId, score, reason]);
  return rows;
};

// Get recommendations for a specific user
exports.getRecommendationsByUser = async (userId) => {
  const query = `
    SELECT r.id AS recommendation_id, s.title, s.deadline, r.score, r.reason
    FROM recommendations r
    JOIN scholarships s ON r.scholarship_id = s.id
    WHERE r.user_id = ?
  `;
  const [rows] = await db.execute(query, [userId]);
  return rows;
};

// Get all recommendations for admin (for review)
exports.getAllRecommendations = async () => {
  const query = `
    SELECT r.id, u.name AS user_name, s.title AS scholarship_title, r.score, r.created_at
    FROM recommendations r
    JOIN users u ON r.user_id = u.id
    JOIN scholarships s ON r.scholarship_id = s.id
  `;
  const [rows] = await db.execute(query);
  return rows;
};
const db = require('../db');

// Create a log entry
exports.createLog = (userId, action, callback) => {
  const query = 'INSERT INTO recommendation_logs (user_id, action) VALUES (?, ?)';
  db.query(query, [userId, action], callback);
};

// Get all logs for a user
exports.getLogsByUser = (userId, callback) => {
  const query = 'SELECT * FROM recommendation_logs WHERE user_id = ?';
  db.query(query, [userId], callback);
};

// Get all logs (admin purpose)
exports.getAllLogs = (callback) => {
  const query = 'SELECT * FROM recommendation_logs';
  db.query(query, callback);
};

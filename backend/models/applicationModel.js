const db = require('../db');

exports.createApplication = (userId, scholarshipId, callback) => {
  const checkQuery = 'SELECT * FROM applications WHERE user_id = ? AND scholarship_id = ?';
  db.query(checkQuery, [userId, scholarshipId], (err, result) => {
    if (err) return callback(err);
    if (result.length > 0) return callback(null, { alreadyApplied: true });

    const insertQuery = 'INSERT INTO applications (user_id, scholarship_id) VALUES (?, ?)';
    db.query(insertQuery, [userId, scholarshipId], callback);
  });
};

exports.getApplicationsByUser = (userId, callback) => {
  const query = `
    SELECT a.id AS application_id, s.title, s.application_deadline, a.status
    FROM applications a
    JOIN scholarships s ON a.scholarship_id = s.id
    WHERE a.user_id = ?
  `;
  db.query(query, [userId], callback);
};
exports.getAllApplications = (callback) => {
  const query = `
    SELECT a.id, u.name AS applicant_name, s.title AS scholarship_title, a.status, a.applied_at
    FROM applications a
    JOIN users u ON a.user_id = u.id
    JOIN scholarships s ON a.scholarship_id = s.id
  `;
  db.query(query, callback);
};

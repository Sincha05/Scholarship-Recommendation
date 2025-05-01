const db = require('../db');

// Apply to a scholarship
const applyToScholarship = (req, res) => {
  const { scholarship_id } = req.body;
  const userId = req.user.id;

  if (!scholarship_id) {
    return res.status(400).json({ error: 'Scholarship ID is required' });
  }

  const scholarshipQuery = 'SELECT * FROM scholarships WHERE id = ? AND deadline > NOW()';
  db.query(scholarshipQuery, [scholarship_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error checking scholarship availability' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Scholarship not available or deadline passed' });
    }

    const existingAppQuery = 'SELECT * FROM applications WHERE user_id = ? AND scholarship_id = ?';
    db.query(existingAppQuery, [userId, scholarship_id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error checking application status' });
      }
      if (result.length > 0) {
        return res.status(409).json({ error: 'Already applied to this scholarship' });
      }

      const applicationQuery = 'INSERT INTO applications (user_id, scholarship_id, status) VALUES (?, ?, ?)';
      db.query(applicationQuery, [userId, scholarship_id, 'pending'], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error submitting application' });
        }
        res.status(201).json({ message: 'Application submitted successfully' });
      });
    });
  });
};

// Get all applications for the logged-in user
const getUserApplications = (req, res) => {
  const userId = req.user.id;
  const query = `
    SELECT a.id, a.status, s.title, s.description, s.deadline, s.amount
    FROM applications a
    JOIN scholarships s ON a.scholarship_id = s.id
    WHERE a.user_id = ?`;
  
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching user applications' });
    }
    res.json(result);
  });
};

module.exports = {
  applyToScholarship,
  getUserApplications
};
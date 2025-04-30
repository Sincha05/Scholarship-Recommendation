const db = require('../db');

exports.applyToScholarship = (req, res) => {
  const { scholarship_id } = req.body;
  const user_id = req.userId;

  const checkQuery = 'SELECT * FROM applications WHERE user_id = ? AND scholarship_id = ?';
  db.query(checkQuery, [user_id, scholarship_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) return res.status(400).json({ message: 'Already applied' });

    const insertQuery = 'INSERT INTO applications (user_id, scholarship_id) VALUES (?, ?)';
    db.query(insertQuery, [user_id, scholarship_id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Applied successfully' });
    });
  });
};

exports.getUserApplications = (req, res) => {
  const user_id = req.userId;
  const query = `
    SELECT a.id AS application_id, s.title, s.application_deadline, a.status
    FROM applications a
    JOIN scholarships s ON a.scholarship_id = s.id
    WHERE a.user_id = ?`;

  db.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

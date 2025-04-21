const db = require('../db');

exports.createScholarship = (req, res) => {
  const {
    title,
    description,
    field_of_study,
    min_gpa,
    target_country,
    gender_requirement,
    income_requirement,
    application_deadline
  } = req.body;

  const query = `
    INSERT INTO scholarships 
    (title, description, field_of_study, min_gpa, target_country, gender_requirement, income_requirement, application_deadline) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [
    title, description, field_of_study, min_gpa, target_country, gender_requirement, income_requirement, application_deadline
  ], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Scholarship added successfully' });
  });
};

exports.getAllScholarships = (req, res) => {
  db.query('SELECT * FROM scholarships WHERE application_deadline >= CURDATE()', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getScholarshipById = (req, res) => {
  db.query('SELECT * FROM scholarships WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(results[0]);
  });
};
const db = require('../db');
exports.createScholarship = (scholarshipData, callback) => {
  const {
    title,
    description,
    field_of_study,
    min_gpa,
    target_country,
    gender_requirement,
    income_requirement,
    application_deadline
  } = scholarshipData;

  const query = `
    INSERT INTO scholarships 
    (title, description, field_of_study, min_gpa, target_country, gender_requirement, income_requirement, application_deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    title,
    description,
    field_of_study,
    min_gpa,
    target_country,
    gender_requirement,
    income_requirement,
    application_deadline
  ], callback);
};

exports.getAllScholarships = (callback) => {
  const query = 'SELECT * FROM scholarships WHERE application_deadline >= CURDATE()';
  db.query(query, callback);
};
exports.getScholarshipById = (id, callback) => {
  const query = 'SELECT * FROM scholarships WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};

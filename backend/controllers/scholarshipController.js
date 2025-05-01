const db = require('../db');

const getAllScholarships = async () => {
  const result = await db.query('SELECT * FROM scholarships');
  return result.rows; // Ensure this returns an array
};

const createScholarship = async (scholarshipData) => {
  const { title, description, deadline, amount } = scholarshipData;
  const result = await db.query(
    'INSERT INTO scholarships (title, description, deadline, amount) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, description, deadline, amount]
  );
  return result.rows[0];
};

module.exports = { getAllScholarships, createScholarship };
const db = require('../db');

const getAllScholarships = async () => {
  try {
    console.log("[Controller] Fetching scholarships from MySQL...");
    
    // Ensure we're using the promise-based query
    const [rows] = await db.promise().query('SELECT * FROM scholarships');
    
    console.log("[Controller] MySQL result:", rows);
    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error("[Controller] MySQL Error in getAllScholarships:", error);
    throw error;
  }
};

const createScholarship = async (scholarshipData) => {
  try {
    const { title, description, deadline, amount } = scholarshipData;
    const [result] = await db.promise().query(
      'INSERT INTO scholarships (title, description, deadline, amount) VALUES (?, ?, ?, ?)',
      [title, description, deadline, amount]
    );
    return result;
  } catch (error) {
    console.error("[Controller] MySQL Error in createScholarship:", error);
    throw error;
  }
};

module.exports = { getAllScholarships, createScholarship };


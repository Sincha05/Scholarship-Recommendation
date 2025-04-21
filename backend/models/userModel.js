const db = require('../db');

// Create a new user
exports.createUser = (userData, callback) => {
  const {
    name, email, password, gender,
    country, field_of_study, gpa,
    income_level, date_of_birth
  } = userData;

  const sql = `
    INSERT INTO users (name, email, password, gender, country, field_of_study, gpa, income_level, date_of_birth)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, password, gender, country, field_of_study, gpa, income_level, date_of_birth], callback);
};

// Get user by email
exports.getUserByEmail = (email, callback) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

// Get user by ID
exports.getUserById = (id, callback) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], callback);
};

// Save or update user preferences
exports.saveUserPreferences = (userId, preferences, callback) => {
  const {
    preferred_country,
    preferred_field,
    min_gpa,
    max_income,
    gender_preference
  } = preferences;

  const checkSql = 'SELECT * FROM user_preferences WHERE user_id = ?';
  db.query(checkSql, [userId], (err, results) => {
    if (err) return callback(err);

    if (results.length > 0) {
      const updateSql = `
        UPDATE user_preferences 
        SET preferred_country = ?, preferred_field = ?, min_gpa = ?, max_income = ?, gender_preference = ?
        WHERE user_id = ?
      `;
      db.query(updateSql, [preferred_country, preferred_field, min_gpa, max_income, gender_preference, userId], callback);
    } else {
      const insertSql = `
        INSERT INTO user_preferences 
        (user_id, preferred_country, preferred_field, min_gpa, max_income, gender_preference)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(insertSql, [userId, preferred_country, preferred_field, min_gpa, max_income, gender_preference], callback);
    }
  });
};

// Get user preferences
exports.getUserPreferences = (userId, callback) => {
  db.query('SELECT * FROM user_preferences WHERE user_id = ?', [userId], callback);
};

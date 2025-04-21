const db = require('../db');

// Save or update user preferences
exports.savePreferences = (userId, preferences, callback) => {
  const {
    preferred_country,
    preferred_field,
    min_gpa,
    max_income,
    gender_preference
  } = preferences;

  const checkQuery = 'SELECT * FROM user_preferences WHERE user_id = ?';
  db.query(checkQuery, [userId], (err, results) => {
    if (err) return callback(err);

    if (results.length > 0) {
      const updateQuery = `
        UPDATE user_preferences 
        SET preferred_country = ?, preferred_field = ?, min_gpa = ?, max_income = ?, gender_preference = ?
        WHERE user_id = ?
      `;
      db.query(updateQuery, [preferred_country, preferred_field, min_gpa, max_income, gender_preference, userId], callback);
    } else {
      const insertQuery = `
        INSERT INTO user_preferences 
        (user_id, preferred_country, preferred_field, min_gpa, max_income, gender_preference)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(insertQuery, [userId, preferred_country, preferred_field, min_gpa, max_income, gender_preference], callback);
    }
  });
};

// Get user preferences
exports.getPreferences = (userId, callback) => {
  db.query('SELECT * FROM user_preferences WHERE user_id = ?', [userId], callback);
};

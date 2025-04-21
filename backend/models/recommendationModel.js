const db = require('../db');

exports.getRecommendedScholarships = (userId, callback) => {
  const userQuery = 'SELECT * FROM users WHERE id = ?';
  const prefQuery = 'SELECT * FROM user_preferences WHERE user_id = ?';

  db.query(userQuery, [userId], (err, userResults) => {
    if (err) return callback(err);
    if (userResults.length === 0) return callback(null, []);

    const user = userResults[0];

    db.query(prefQuery, [userId], (err, prefResults) => {
      if (err) return callback(err);

      const prefs = prefResults[0] || {};

      const query = `
        SELECT * FROM scholarships
        WHERE
          (country = ? OR ? IS NULL OR ? = '')
          AND (field_of_study = ? OR ? IS NULL OR ? = '')
          AND (min_gpa <= ? OR min_gpa IS NULL)
          AND (max_income >= ? OR max_income IS NULL)
          AND (gender_requirement = ? OR gender_requirement = 'any' OR ? IS NULL OR ? = '')
        ORDER BY deadline ASC
      `;

      const values = [
        prefs.preferred_country, prefs.preferred_country, prefs.preferred_country,
        prefs.preferred_field, prefs.preferred_field, prefs.preferred_field,
        user.gpa,
        user.income_level,
        prefs.gender_preference, prefs.gender_preference, prefs.gender_preference
      ];

      db.query(query, values, callback);
    });
  });
};

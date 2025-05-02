const db = require('../db');

class Preference {
  static async savePreferences(userId, preferences) {
    const query = `
      INSERT INTO preferences (
        user_id, category, degree, income, state,
        preferred_country, preferred_field, min_gpa, max_income, gender_preference
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        category = VALUES(category),
        degree = VALUES(degree),
        income = VALUES(income),
        state = VALUES(state),
        preferred_country = VALUES(preferred_country),
        preferred_field = VALUES(preferred_field),
        min_gpa = VALUES(min_gpa),
        max_income = VALUES(max_income),
        gender_preference = VALUES(gender_preference),
        updated_at = CURRENT_TIMESTAMP
    `;

    const values = [
      userId,
      preferences.category,
      preferences.degree,
      preferences.income,
      preferences.state,
      preferences.preferred_country,
      preferences.preferred_field,
      preferences.min_gpa,
      preferences.max_income,
      preferences.gender_preference
    ];

    await db.query(query, values);
  }

  static async getPreferences(userId) {
    const [rows] = await db.query(
      'SELECT * FROM preferences WHERE user_id = ? LIMIT 1',
      [userId]
    );
    return rows[0] || null;
  }
}

module.exports = Preference;
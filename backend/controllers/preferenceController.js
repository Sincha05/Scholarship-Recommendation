const db = require('../db');

exports.savePreferences = (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const {
    category,
    degree,
    income,
    state,
    preferred_country,
    preferred_field,
    min_gpa,
    max_income,
    gender_preference
  } = req.body;

  if (!preferred_country || !preferred_field) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

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
    category,
    degree,
    income,
    state,
    preferred_country,
    preferred_field,
    min_gpa,
    max_income,
    gender_preference
  ];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error saving preferences:', error);
      return res.status(500).json({
        error: 'Failed to save preferences',
        details: error.message
      });
    }

    res.json({
      success: true,
      message: 'Preferences saved successfully'
    });
  });
};

exports.getPreferences = (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  db.query(
    'SELECT * FROM preferences WHERE user_id = ? LIMIT 1',
    [userId],
    (error, results) => {
      if (error) {
        console.error('Error fetching preferences:', error);
        return res.status(500).json({
          error: 'Failed to fetch preferences',
          details: error.message
        });
      }

      if (results.length === 0) {
        return res.json({
          preferred_country: '',
          preferred_field: '',
          min_gpa: '',
          max_income: '',
          gender_preference: '',
          category: '',
          degree: '',
          income: '',
          state: ''
        });
      }

      res.json(results[0]);
    }
  );
};

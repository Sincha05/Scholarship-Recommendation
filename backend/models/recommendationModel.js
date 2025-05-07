const db = require('../db'); // Ensure db is properly set up

// Function to fetch recommendations based on user preferences
const getRecommendationsForUser = (userId, callback) => {
  // Fetch preferences for the user
  const preferencesQuery = `
    SELECT * FROM preferences WHERE user_id = ?
  `;
  
  db.query(preferencesQuery, [userId], (err, preferences) => {
    if (err) {
      console.error('Error fetching preferences:', err);
      return callback(err, null);
    }

    if (!preferences || preferences.length === 0) {
      console.error('No preferences found for user:', userId);
      return callback(null, []);
    }

    const userPreferences = preferences[0];  // Assuming one preference per user

    // Fetch recommendations based on preferences
    const recommendationQuery = `
      SELECT * FROM scholarships
      WHERE preferred_country = ? 
      AND preferred_field = ? 
      AND min_gpa <= ? 
      AND max_income >= ?
    `;

    db.query(recommendationQuery, [
      userPreferences.preferred_country,
      userPreferences.preferred_field,
      userPreferences.min_gpa,
      userPreferences.max_income
    ], (err, recommendations) => {
      if (err) {
        console.error('Error fetching recommendations:', err);
        return callback(err, null);
      }

      callback(null, recommendations);
    });
  });
};

module.exports = { getRecommendationsForUser };

const db = require('../db');

const getRecommendationsForUser = (userId, callback) => {
  // Fetch preferences for the user
  const preferencesQuery = `
    SELECT * FROM preferences WHERE user_id = ?
  `;
  
  console.log('Executing preferences query for userId:', userId);  // Log the userId

  db.query(preferencesQuery, [userId], (err, preferences) => {
    if (err) {
      console.error('Error fetching preferences:', err);
      return callback(err, null);  // Return the error
    }

    // If no preferences found for the user, log the error and return empty array
    if (!preferences || preferences.length === 0) {
      console.error('No preferences found for user:', userId);
      return callback(null, []);  // If no preferences found, return empty array
    }

    const userPreferences = preferences[0];  // Get the user's first preference set

    // Log the fetched preferences for debugging
    console.log('User preferences:', userPreferences);

    // Fetch scholarships that match at least some of the criteria
    // Using a more relaxed query to find relevant scholarships even if not all criteria match
    const recommendationQuery = `
      SELECT 
        s.id, 
        s.title as scholarshipName, 
        s.description, 
        s.amount, 
        s.deadline,
        s.field_of_study,
        s.eligibility_criteria,
        s.preferred_country,
        s.preferred_field,
        s.min_gpa,
        s.max_income,
        ROUND(
          (
            (CASE WHEN s.preferred_country = ? OR s.preferred_country = 'Any' THEN 25 ELSE 0 END) +
            (CASE WHEN s.preferred_field = ? THEN 25 ELSE 0 END) +
            (CASE WHEN s.min_gpa <= ? THEN 25 ELSE 0 END) +
            (CASE WHEN s.max_income >= ? THEN 25 ELSE 0 END)
          ) * 1.0
        ) as score
      FROM scholarships s
      WHERE 
        (s.preferred_country = ? OR s.preferred_country = 'Any')
        OR s.preferred_field = ?
        OR (s.min_gpa <= ? AND s.min_gpa > 0)
        OR (s.max_income >= ? AND s.max_income > 0)
      ORDER BY score DESC
      LIMIT 10
    `;
    
    console.log('Executing relaxed recommendation query with preferences:', userPreferences);  // Log the preferences

    db.query(recommendationQuery, [
      userPreferences.preferred_country,
      userPreferences.preferred_field,
      userPreferences.min_gpa,
      userPreferences.max_income,
      userPreferences.preferred_country,
      userPreferences.preferred_field,
      userPreferences.min_gpa,
      userPreferences.max_income
    ], (err, scholarships) => {
      if (err) {
        console.error('Error fetching scholarships:', err);
        return callback(err, null);
      }

      // Check if scholarships is empty
      if (!scholarships || scholarships.length === 0) {
        console.log('No matching scholarships found even with relaxed criteria');
        return callback(null, []);
      }

      // Convert scholarships to recommendations format
      const recommendations = scholarships.map(scholarship => {
        let reason = "Matches ";
        
        if (scholarship.preferred_country === userPreferences.preferred_country || 
            scholarship.preferred_country === 'Any') {
          reason += "your preferred country";
        }
        
        if (scholarship.preferred_field === userPreferences.preferred_field) {
          reason += reason.includes("your") ? " and field of study" : "your field of study";
        }
        
        if (scholarship.min_gpa <= userPreferences.min_gpa) {
          reason += reason.includes("your") ? " and academic requirements" : "your academic requirements";
        }
        
        if (scholarship.max_income >= userPreferences.max_income) {
          reason += reason.includes("your") ? " and financial criteria" : "your financial criteria";
        }
        
        if (!reason.includes("your")) {
          reason = "Potentially compatible with your profile";
        }
        
        return {
          id: scholarship.id,
          scholarshipName: scholarship.scholarshipName,
          score: scholarship.score,
          reason: reason,
          details: {
            description: scholarship.description,
            amount: scholarship.amount,
            deadline: scholarship.deadline,
            eligibility: scholarship.eligibility_criteria
          }
        };
      });

      console.log(`Found ${recommendations.length} recommendations with the relaxed criteria`);
      callback(null, recommendations);
    });
  });
};

module.exports = { getRecommendationsForUser };
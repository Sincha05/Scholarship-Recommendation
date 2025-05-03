const Recommendation = require('../models/recommendationModel');
const Preference = require('../models/preferenceModel');
const Scholarship = require('../models/scholarshipModel');

const generateRecommendations = (req, res) => {
  const userId = req.params.userId;

  Preference.getPreferences(userId, (prefErr, preferences) => {
    if (prefErr) {
      console.error('Error fetching preferences:', prefErr);
      return res.status(500).json({ message: 'Failed to fetch preferences' });
    }

    if (!preferences || !preferences.preferred_field) {
      return res.status(404).json({ message: 'No preferences found or preferred field missing' });
    }

    const fields = preferences.preferred_field.split(',').map(f => f.trim());

    Scholarship.getScholarshipsByFields(fields, (schErr, scholarships) => {
      if (schErr) {
        console.error('Error fetching scholarships:', schErr);
        return res.status(500).json({ message: 'Failed to fetch scholarships' });
      }

      if (!scholarships || scholarships.length === 0) {
        return res.status(200).json({ message: 'No matching scholarships found' });
      }

      const recommendations = [];
      let processed = 0;

      scholarships.forEach((scholarship) => {
        Recommendation.getRecommendationsByUserAndScholarship(userId, scholarship.id, (recErr, existing) => {
          if (recErr) {
            console.error('Error checking existing recommendation:', recErr);
            return; // Skip this one but continue processing others
          }

          if (!existing) {
            const score = 0.95; // Replace with your scoring logic
            const reason = `Matches your interest in ${scholarship.field}`;

            Recommendation.createRecommendation(userId, scholarship.id, score, reason, (createErr) => {
              if (createErr) {
                console.error('Error creating recommendation:', createErr);
              } else {
                recommendations.push({ userId, scholarshipId: scholarship.id, score, reason });
              }

              processed++;
              if (processed === scholarships.length) {
                res.status(200).json(recommendations);
              }
            });
          } else {
            processed++;
            if (processed === scholarships.length) {
              res.status(200).json(recommendations);
            }
          }
        });
      });
    });
  });
};

module.exports = {
  generateRecommendations,
};

const Recommendation = require('../models/recommendationModel');

exports.getRecommendations = (req, res) => {
  const userId = req.userId;

  Recommendation.getRecommendedScholarships(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      user_id: userId,
      recommended_scholarships: results
    });
  });
};

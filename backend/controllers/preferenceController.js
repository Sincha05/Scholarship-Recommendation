const Preference = require('../models/preferenceModel');

exports.savePreferences = (req, res) => {
  const userId = req.userId;
  const preferences = req.body;

  Preference.savePreferences(userId, preferences, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Preferences saved successfully' });
  });
};

exports.getPreferences = (req, res) => {
  const userId = req.userId;

  Preference.getPreferences(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || {});
  });
};

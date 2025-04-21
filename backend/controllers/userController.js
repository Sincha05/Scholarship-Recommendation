const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = (req, res) => {
  const { name, email, password, gender, country, field_of_study, gpa, income_level, date_of_birth } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = `INSERT INTO users (name, email, password, gender, country, field_of_study, gpa, income_level, date_of_birth)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [name, email, hashedPassword, gender, country, field_of_study, gpa, income_level, date_of_birth], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User registered successfully' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
};

exports.getProfile = (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

exports.savePreferences = (req, res) => {
  const { preferred_country, preferred_field, min_gpa, max_income, gender_preference } = req.body;

  const checkQuery = 'SELECT * FROM user_preferences WHERE user_id = ?';
  db.query(checkQuery, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      const updateQuery = `UPDATE user_preferences SET preferred_country=?, preferred_field=?, min_gpa=?, max_income=?, gender_preference=? WHERE user_id=?`;
      db.query(updateQuery, [preferred_country, preferred_field, min_gpa, max_income, gender_preference, req.userId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Preferences updated successfully' });
      });
    } else {
      const insertQuery = `INSERT INTO user_preferences (user_id, preferred_country, preferred_field, min_gpa, max_income, gender_preference)
                           VALUES (?, ?, ?, ?, ?, ?)`;
      db.query(insertQuery, [req.userId, preferred_country, preferred_field, min_gpa, max_income, gender_preference], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Preferences saved successfully' });
      });
    }
  });
};

exports.getPreferences = (req, res) => {
  db.query('SELECT * FROM user_preferences WHERE user_id = ?', [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();



exports.register = (req, res) => {
  const {
    name, email, password, gender, country,
    field_of_study, gpa, income_level, date_of_birth
  } = req.body;

  // Validate email format
  if (!email || !email.includes('@gmail.com') || !email.endsWith('.com')) {
    return res.status(400).json({ error: 'Invalid email. Must be a valid Gmail address.' });
  }

  // Validate DOB not in future
  const dob = new Date(date_of_birth);
const today = new Date();

// Check if DOB is in the future
if (dob > today) {
  return res.status(400).json({ error: 'Date of birth cannot be in the future.' });
}

// Check if user is at least 18
const ageDiff = today.getFullYear() - dob.getFullYear();
const monthDiff = today.getMonth() - dob.getMonth();
const dayDiff = today.getDate() - dob.getDate();

const is18OrOlder =
  ageDiff > 18 ||
  (ageDiff === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));

if (!is18OrOlder) {
  return res.status(400).json({ error: 'You must be at least 18 years old to register.' });
}


  // Validate strong password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
    });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 8);

  const query = `INSERT INTO users 
    (name, email, password, gender, country, field_of_study, gpa, income_level, date_of_birth)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [name, email, hashedPassword, gender, country, field_of_study, gpa, income_level, date_of_birth],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User registered successfully' });
    }
  );
};


exports.login = (req, res) => {
  console.log('Login request received:', req.body); // Log incoming request
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    console.log('Missing credentials');
    return res.status(400).json({ message: 'Email and password are required' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    
    if (results.length === 0) {
      console.log('User not found for email:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    console.log('User found:', user.id);
    
    try {
      console.log('Comparing passwords...');
      console.log('Input password:', password);
      console.log('Stored hash:', user.password);
      
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      console.log('Password match:', passwordIsValid);
      
      if (!passwordIsValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
      console.log('Login successful for user:', user.id);
      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (error) {
      console.error('Password comparison error:', error);
      res.status(500).json({ message: 'Authentication error', error: error.message });
    }
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

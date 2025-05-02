const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise'); // Using promise-based MySQL

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const verifyToken = async (req, res, next) => {
  console.log('Incoming Headers:', req.headers);
  
  try {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      console.error('No Authorization header found');
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Malformed token' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    
    // Check if user exists in MySQL database
    const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [decoded.id]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Authentication Error:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized - Token expired' });
    }
    
    res.status(500).json({ error: 'Authentication failed', details: error.message });
  }
};

module.exports = {verifyToken};
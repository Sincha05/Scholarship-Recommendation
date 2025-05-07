const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Get token from header

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: 'No token provided. Access denied.' });
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach decoded user info to the request object
    console.log("Decoded token:", decoded);  // Log decoded token for debugging purposes
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };

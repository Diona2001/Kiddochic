// middleware/authToken.js
const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  // Check if the Authorization header is present
  if (!authHeader) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }
  
  // Split the header to extract the token
  const token = authHeader.split(' ')[1]; // Assumes "Bearer <token>"
  
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }
  
  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.user = verified; // Attach the decoded token to the request object
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authToken;

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request
 */
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access token required' 
      });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ 
          success: false,
          message: 'Invalid or expired token' 
        });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Authentication error' 
    });
  }
};

/**
 * Optional Authentication Middleware
 * Attaches user if token exists, but doesn't require it
 */
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (!err) {
          req.user = decoded;
        }
      });
    }
    next();
  } catch (error) {
    next();
  }
};

module.exports = { authenticateToken, optionalAuth };

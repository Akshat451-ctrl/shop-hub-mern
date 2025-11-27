import jwt from 'jsonwebtoken';
import { verifyTokenWithFallback } from '../utils/jwtUtils.js';

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

    try {
      const decoded = verifyTokenWithFallback(token);
      req.user = decoded;
      next();
    } catch (err) {
      // Invalid token or verification failed
      return res.status(401).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }
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
      try {
        const decoded = verifyTokenWithFallback(token);
        if (decoded) req.user = decoded;
      } catch (err) {
        // Ignore verification errors in optional auth
      }
    }
    next();
  } catch (error) {
    next();
  }
};

export { authenticateToken, optionalAuth };

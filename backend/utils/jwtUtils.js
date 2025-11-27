import jwt from 'jsonwebtoken';

const getSecret = () => {
  return process.env.JWT_SECRET || 'your-secret-key-change-in-production';
};

const getPrevSecret = () => {
  return process.env.JWT_PREV_SECRET || null;
};

/**
 * Tries to verify token using the primary JWT_SECRET, then attempts the prev secret if provided.
 * Throws the original error if verification fails with both secrets.
 */
export const verifyTokenWithFallback = (token) => {
  const secret = getSecret();
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    const prev = getPrevSecret();
    if (prev) {
      try {
        return jwt.verify(token, prev);
      } catch (err2) {
        // rethrow original error for context
        console.warn('JWT verification failed with both current and prev secrets:', err.name);
        throw err;
      }
    }
    console.warn('JWT verification failed:', err.name);
    throw err;
  }
};

export default { verifyTokenWithFallback };

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import recommendationRoutes from './routes/recommendations.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

dotenv.config(); // ← important (agar .env file use karta hai toh)

const app = express();
const PORT = process.env.PORT || 5000;

// YEHI LINE SABSE ZAROORI HAI → Render pe Atlas connect karega
const MONGODB_URI = 
  process.env.MONGODB_URI || 
  process.env.MONGO_URI || 
  'mongodb://localhost:27017/shophub';

// Middleware
app.use(cors({
  origin: true, // frontend (Vercel/Netlify) se allow karega
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (sirf development mein)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Image Proxy Route (to bypass CORS for Amazon/external images)
app.get('/proxy', async (req, res) => {
  try {
    const imageUrl = req.query.url;
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const fetch = (await import('node-fetch')).default;
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch image' });
    }

    // Forward the content type and stream the image
    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    response.body.pipe(res);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy image' });
  }
});

// Health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'ShopHub API is LIVE!',
    version: '2.0.0',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    endpoints: {
      products: '/api/products',
      search: '/api/search',
      auth: '/api/auth',
      recommendations: '/api/recommendations'
    }
  });
});

// 404 & Error Handler
app.use(notFound);
app.use(errorHandler);

// MongoDB Connection + Server Start
// Ensure JWT_SECRET is configured in production otherwise exit to avoid insecure default usage
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.error('JWT_SECRET is NOT configured in production. Please set JWT_SECRET environment variable. Exiting.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully (Atlas/Render Ready)');
    
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Live API → https://your-backend.onrender.com`);
      // Masked secret info for debugging only (do not expose the secret itself)
      try {
        const jwtSecret = process.env.JWT_SECRET;
        if (jwtSecret) {
          console.log(`JWT_SECRET configured (length=${jwtSecret.length})`);
        } else {
          console.warn('JWT_SECRET is NOT configured. Tokens will be signed/verified with fallback default.');
        }
        const jwtPrev = process.env.JWT_PREV_SECRET;
        console.log(`JWT_PREV_SECRET present: ${jwtPrev ? 'yes' : 'no'}`);
      } catch (err) {
        // Do not fail startup if logging fails
      }
    });

    // Handle port conflicts
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is busy. Render will auto-assign a port.`);
      } else {
        console.error('Server error:', err);
      }
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

// Lightweight status endpoint to help debug environment and connectivity
app.get('/__status', (req, res) => {
  const jwtConfigured = !!process.env.JWT_SECRET;
  const dbConnected = mongoose.connection.readyState === 1;
  res.json({
    success: true,
    environment: process.env.NODE_ENV || 'development',
    jwtConfigured,
    dbConnected,
    port: PORT
  });
});
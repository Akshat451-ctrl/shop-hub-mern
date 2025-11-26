import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import recommendationRoutes from './routes/recommendations.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shophub';

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Request logging middleware (development)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Routes
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'ShopHub API is running!',
    version: '2.0.0',
    endpoints: {
      products: '/api/products',
      search: '/api/search',
      auth: '/api/auth',
      recommendations: '/api/recommendations'
    }
  });
});

// 404 handler
app.use(notFound);

// Error handler (must be last)
app.use(errorHandler);

// MongoDB Connection
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
  
  // Start server after successful DB connection
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  });

  // Handle server 'error' events (e.g. EADDRINUSE)
  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Please free the port or set a different PORT environment variable.`);
      console.error('Tip: On Windows run `netstat -aon | findstr :5000` to find the PID then `taskkill /PID <pid> /F` to kill it.');
      process.exit(1);
    }

    console.error('Server error:', err);
    process.exit(1);
  });
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

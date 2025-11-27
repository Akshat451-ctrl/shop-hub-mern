import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import recommendationRoutes from './routes/recommendations.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -----------------------------
//  🔥 CORRECT & SAFE CORS SETUP
// -----------------------------

// 👉 Change only these URLs
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://your-frontend.vercel.app",
  "https://your-frontend.netlify.app",
  "https://shop-hub-mern-3a7vgdw43-akshat-ghtaiyas-projects.vercel.app/"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // mobile apps, curl, postman

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS BLOCKED: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// -----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB URI
const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/shophub";

// -----------------------------
// 🔥 DEVELOPMENT LOGGING
// -----------------------------
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// -----------------------------
// 🔥 ROUTES
// -----------------------------
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recommendations', recommendationRoutes);

// -----------------------------
// 🔥 IMAGE PROXY (Fixes Amazon, Unsplash CORS)
// -----------------------------
app.get('/proxy', async (req, res) => {
  try {
    const imageUrl = req.query.url;
    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    const fetch = (await import('node-fetch')).default;
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch image" });
    }

    res.setHeader("Content-Type", response.headers.get("content-type") || "image/jpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");

    response.body.pipe(res);
  } catch (err) {
    console.error("Proxy Error:", err);
    res.status(500).json({ error: "Failed to proxy image" });
  }
});

// -----------------------------
// 🔥 HEALTH CHECK
// -----------------------------
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "ShopHub API is LIVE!",
    version: "2.0.0",
    db: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    endpoints: {
      products: "/api/products",
      auth: "/api/auth",
      recommendations: "/api/recommendations"
    }
  });
});

// -----------------------------
// 🔥 ERRORS
// -----------------------------
app.use(notFound);
app.use(errorHandler);

// -----------------------------
// 🔥 MONGO CONNECTION + START SERVER
// -----------------------------

if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  console.error("❌ ERROR: JWT_SECRET missing in production.");
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} already in use`);
      } else {
        console.error("Server Error:", err);
      }
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// -----------------------------
// 🔥 STATUS CHECK
// -----------------------------
app.get("/__status", (req, res) => {
  res.json({
    success: true,
    environment: process.env.NODE_ENV || "development",
    dbConnected: mongoose.connection.readyState === 1,
    jwtConfigured: !!process.env.JWT_SECRET
  });
});

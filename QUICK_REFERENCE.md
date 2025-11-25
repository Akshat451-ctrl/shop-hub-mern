# 📋 Quick Reference Card

## 🚀 Start Commands

```bash
# Backend
cd backend
npm install
npm run seed
npm start

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## 🌐 URLs

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **API Docs:** http://localhost:5000/api

## 🔑 Environment Variables

```env
# backend/.env
MONGODB_URI=mongodb://localhost:27017/shophub
PORT=5000
JWT_SECRET=change-this-in-production
```

## 📡 API Endpoints

### Products
```
GET  /api/products
GET  /api/search?q=term
```

### Auth
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Recommendations
```
GET  /api/recommendations
POST /api/recommendations/track-view
POST /api/recommendations/toggle-favorite
```

## 🎨 Tailwind Classes

### Layout
```jsx
className="flex items-center justify-between"
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
className="max-w-7xl mx-auto px-4"
```

### Colors
```jsx
className="bg-primary-500 text-white"
className="bg-gradient-to-r from-pink-400 to-purple-400"
```

### Effects
```jsx
className="hover:shadow-2xl hover:-translate-y-2 transition-all"
className="rounded-xl shadow-md"
```

## 📁 Key Files

### Backend
- `server.js` - Express server
- `models/User.js` - User schema
- `models/Product.js` - Product schema
- `routes/auth.js` - Authentication
- `routes/recommendations.js` - Recommendations
- `seed.js` - Database seeding

### Frontend
- `App.jsx` - Main app
- `components/Header.jsx` - Header with auth
- `components/AuthModal.jsx` - Login/Register
- `components/Recommendations.jsx` - Recommendations
- `components/Hero.jsx` - Hero section

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
mongod

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Frontend won't start
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

### No products showing
```bash
cd backend
npm run seed
```

## 🔐 Test Credentials

Create a test user:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

## 📚 Documentation

- **START_HERE.md** - Quick start
- **FEATURES_ADDED.md** - New features
- **TAILWIND_GUIDE.md** - Tailwind CSS
- **FINAL_PROJECT_SUMMARY.md** - Complete guide

## ✅ Feature Checklist

- [x] User authentication
- [x] Product recommendations
- [x] Search & filter
- [x] Responsive design
- [x] Tailwind CSS
- [x] MongoDB database
- [x] JWT security

## 🎯 Quick Tips

1. Keep both terminals running
2. Check browser console (F12)
3. Verify MongoDB is running
4. Change JWT_SECRET in production
5. Use MongoDB Atlas for production

---

**Need help?** Check the documentation files!

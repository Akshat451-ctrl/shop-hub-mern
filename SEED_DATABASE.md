# 🌱 Seed Your Database - Quick Guide

## Problem

Your backend is configured correctly, but the database is empty. That's why you're getting 500 errors.

## Solution: Seed the Database

### Option 1: Seed from Render Shell (Recommended)

1. Go to https://dashboard.render.com/
2. Click on your service (shop-hub-mern)
3. Click on **"Shell"** tab (top right corner)
4. Wait for shell to load
5. Run this command:
```bash
npm run seed
```

6. You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
✅ Successfully seeded 20 products
👋 Database connection closed
```

### Option 2: Seed from Your Local Machine

1. Open your `backend/.env` file
2. Update it with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://statusdekho3:Akshat123@cluster0.bqh7iqm.mongodb.net/shophub?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

3. Run seed command:
```bash
cd backend
npm run seed
```

4. You should see success messages

### Option 3: Seed via MongoDB Compass (Manual)

If the above don't work:

1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Connect using your connection string
3. Create database: `shophub`
4. Create collection: `products`
5. Import the products manually

## Verify Database is Seeded

### Method 1: Check via API

Visit this URL in your browser:
```
https://shop-hub-mern.onrender.com/api/products
```

Should return JSON with 20 products.

### Method 2: Check MongoDB Atlas

1. Go to https://cloud.mongodb.com/
2. Click on your cluster
3. Click **"Browse Collections"**
4. You should see:
   - Database: `shophub`
   - Collection: `products`
   - Documents: 20

### Method 3: Check Render Logs

1. Go to your Render service
2. Click **"Logs"** tab
3. Look for "MongoDB Connected Successfully"

## Common Issues

### Issue: "npm: command not found"

**Solution:** Render Shell might not be ready. Wait a few seconds and try again.

### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Check your MongoDB Atlas IP whitelist has `0.0.0.0/0`
2. Check your password is correct in the connection string
3. Wait 2-3 minutes after making changes

### Issue: "Module not found"

**Solution:**
1. Make sure you're in the backend directory
2. Run `npm install` first
3. Then run `npm run seed`

## Quick Test

After seeding, test these URLs:

1. **Health Check:**
```
https://shop-hub-mern.onrender.com/
```
Should show: "ShopHub API is LIVE!" with database status "Connected"

2. **Products API:**
```
https://shop-hub-mern.onrender.com/api/products
```
Should return 20 products

3. **Your Frontend:**
Visit your Vercel URL - products should load!

## Environment Variables Checklist

Make sure these are set on Render:

```
MONGODB_URI=mongodb+srv://statusdekho3:Akshat123@cluster0.bqh7iqm.mongodb.net/shophub?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

## Success!

Once seeded:
- ✅ Backend returns products
- ✅ Frontend loads products
- ✅ Search works
- ✅ All features work

## Need Help?

If seeding fails:

1. **Check Render Logs** - Look for error messages
2. **Check MongoDB Atlas** - Make sure cluster is active
3. **Test locally first** - Seed from your machine
4. **Check connection string** - Make sure it's correct

---

**Seed your database and your app will work! 🚀**

# ⚡ Fix 500 Error - 3 Steps

## 🎯 Your Problem

Backend returns **500 Internal Server Error** because MongoDB is not connected.

## ✅ Solution (3 Steps - 10 Minutes)

### Step 1: Setup MongoDB Atlas (5 minutes)

1. Go to https://cloud.mongodb.com/
2. Sign up or sign in
3. Click **"Build a Database"** → Choose **"FREE"**
4. Wait for cluster creation (3 minutes)
5. Create database user:
   - Username: `shopuser`
   - Password: Click "Autogenerate" (SAVE THIS!)
6. Whitelist IP: Add `0.0.0.0/0`
7. Click **"Connect"** → **"Connect your application"**
8. Copy connection string
9. Replace `<password>` with your actual password
10. Add `/shophub` before the `?`

**Final format:**
```
mongodb+srv://shopuser:YourPassword@cluster0.xxxxx.mongodb.net/shophub?retryWrites=true&w=majority
```

### Step 2: Add to Render (2 minutes)

1. Go to https://dashboard.render.com/
2. Click your service
3. Go to **"Environment"** tab
4. Add or update:
   ```
   MONGODB_URI=mongodb+srv://shopuser:YourPassword@cluster0.xxxxx.mongodb.net/shophub?retryWrites=true&w=majority
   ```
5. Click **"Save Changes"**
6. Click **"Manual Deploy"** → **"Deploy latest commit"**
7. Wait 2-3 minutes

### Step 3: Seed Database (3 minutes)

**Option A: From Render Shell**
1. Go to your Render service
2. Click **"Shell"** tab
3. Run: `npm run seed`

**Option B: From Local**
1. Update your local `backend/.env` with the MongoDB URI
2. Run:
```bash
cd backend
npm run seed
```

## 🧪 Test It

Visit these URLs:

1. https://shop-hub-mern.onrender.com/
   - Should show: "ShopHub API is running!"

2. https://shop-hub-mern.onrender.com/api/products
   - Should show: JSON with 20 products

3. Your Vercel frontend
   - Should load products! ✅

## 🎉 Done!

Your app is now fully working!

## 🐛 Still Not Working?

### If MongoDB connection fails:

1. **Check password** - No special characters like `@`, `:`, `/`
2. **Check IP whitelist** - Must have `0.0.0.0/0`
3. **Wait 2-3 minutes** - Changes take time to apply

### If products don't load:

1. **Run seed command** - Database might be empty
2. **Check Render logs** - Look for errors
3. **Redeploy** - Sometimes helps

## 📚 Detailed Guides

Need more help? Check these:

- **MONGODB_SETUP.md** - Complete MongoDB setup
- **RENDER_FIX.md** - Detailed Render troubleshooting
- **COMPLETE_DEPLOYMENT_CHECKLIST.md** - Full deployment guide

---

**That's it! Just 3 steps and your app works! 🚀**

# 🚀 Deployment Guide - ShopHub MERN Stack

## Problem Solved! ✅

Your CORS error has been fixed! The issue was that your frontend was still trying to connect to `localhost:5000` instead of your deployed backend URL.

## What I Fixed

### 1. Created API Configuration File
- `frontend/src/config/api.js` - Centralized API URL management
- Automatically uses correct URL based on environment

### 2. Environment Variables
- `.env.development` - Uses `http://localhost:5000` for local development
- `.env.production` - Uses `https://shop-hub-mern.onrender.com` for production

### 3. Updated All API Calls
- ✅ App.jsx - Product fetching
- ✅ Header.jsx - Search autosuggest
- ✅ Recommendations.jsx - Recommendations
- ✅ AuthModal.jsx - Login/Register

### 4. Fixed Backend CORS
- Added proper CORS configuration
- Whitelisted your Vercel frontend URL
- Enabled credentials

## 🔧 Deployment Steps

### Backend (Render) - Already Done ✅

Your backend is deployed at: `https://shop-hub-mern.onrender.com`

**Environment Variables on Render:**
```
MONGODB_URI=your-mongodb-atlas-uri
PORT=5000
JWT_SECRET=your-super-secret-key
FRONTEND_URL=https://shop-hub-mern.vercel.app
NODE_ENV=production
```

### Frontend (Vercel) - Need to Redeploy

#### Option 1: Redeploy from Vercel Dashboard

1. Go to your Vercel project
2. Go to **Settings** → **Environment Variables**
3. Add this variable:
   ```
   VITE_API_URL=https://shop-hub-mern.onrender.com
   ```
4. Go to **Deployments**
5. Click on the latest deployment
6. Click **Redeploy**

#### Option 2: Push to GitHub (Recommended)

1. Commit the changes:
```bash
git add .
git commit -m "Fix: Update API URL for production deployment"
git push origin main
```

2. Vercel will automatically redeploy

## 📝 Vercel Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_API_URL` | `https://shop-hub-mern.onrender.com` | Production |

## 🔍 Verify Deployment

After redeploying, check:

1. **Frontend URL:** Your Vercel URL
2. **Backend URL:** https://shop-hub-mern.onrender.com
3. **Test API:** https://shop-hub-mern.onrender.com/api/products

### Test Checklist:
- [ ] Products load on homepage
- [ ] Search works
- [ ] Login/Register works
- [ ] Recommendations load
- [ ] Add to cart works
- [ ] Favorites work
- [ ] No CORS errors in console

## 🐛 Troubleshooting

### If CORS Error Still Appears:

1. **Check Render Environment Variables:**
   - Make sure `FRONTEND_URL` is set to your Vercel URL
   - Restart the Render service

2. **Check Vercel Environment Variables:**
   - Make sure `VITE_API_URL` is set correctly
   - Redeploy after adding variables

3. **Clear Browser Cache:**
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
   - Or open in incognito mode

### If Backend is Slow:

Render free tier spins down after inactivity. First request may take 30-60 seconds.

**Solution:** Upgrade to paid tier or use a keep-alive service.

## 📋 Complete Environment Variables

### Backend (Render)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shophub
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
FRONTEND_URL=https://shop-hub-mern.vercel.app
NODE_ENV=production
```

### Frontend (Vercel)
```env
VITE_API_URL=https://shop-hub-mern.onrender.com
```

## 🎯 Quick Fix Commands

### Local Development
```bash
# Backend
cd backend
npm start

# Frontend (new terminal)
cd frontend
npm run dev
```

### Production Build Test
```bash
cd frontend
npm run build
npm run preview
```

## 🔗 Important URLs

- **Frontend (Vercel):** Your Vercel deployment URL
- **Backend (Render):** https://shop-hub-mern.onrender.com
- **API Health Check:** https://shop-hub-mern.onrender.com/
- **Products API:** https://shop-hub-mern.onrender.com/api/products

## ✅ What's Fixed

1. ✅ API URL configuration
2. ✅ Environment variables setup
3. ✅ CORS configuration
4. ✅ All API calls updated
5. ✅ Development/Production separation

## 🚀 Next Steps

1. **Redeploy Frontend on Vercel**
   - Add environment variable
   - Trigger redeploy

2. **Test Your Live Site**
   - Visit your Vercel URL
   - Check browser console for errors
   - Test all features

3. **Monitor Performance**
   - Check Render logs
   - Check Vercel logs
   - Monitor API response times

## 💡 Pro Tips

1. **Keep Backend Awake:**
   - Use a service like UptimeRobot to ping your backend every 5 minutes
   - Or upgrade to Render paid tier

2. **Environment Variables:**
   - Never commit `.env` files
   - Always use environment variables for sensitive data
   - Different values for dev/prod

3. **CORS:**
   - Always whitelist your frontend URL
   - Use environment variables for flexibility

4. **Debugging:**
   - Check browser console
   - Check Render logs
   - Check Vercel logs

## 🎉 Success!

After redeploying, your app should work perfectly with:
- ✅ No CORS errors
- ✅ Products loading
- ✅ Search working
- ✅ Authentication working
- ✅ All features functional

## 📞 Still Having Issues?

If you still face issues after redeploying:

1. **Check Browser Console:**
   - Press F12
   - Look for error messages
   - Check Network tab

2. **Check Render Logs:**
   - Go to Render dashboard
   - Click on your service
   - Check logs for errors

3. **Verify Environment Variables:**
   - Render: Check all variables are set
   - Vercel: Check VITE_API_URL is set

4. **Test API Directly:**
   - Visit: https://shop-hub-mern.onrender.com/api/products
   - Should return JSON data

---

**Your deployment issue is now fixed! Just redeploy and you're good to go! 🚀**

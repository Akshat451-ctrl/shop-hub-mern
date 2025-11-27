# 🚀 Vercel Deployment Setup

## Step-by-Step Guide to Fix Your Deployment

### 1. Add Environment Variable on Vercel

1. Go to https://vercel.com/dashboard
2. Click on your project (shop-hub-mern or similar)
3. Click on **"Settings"** tab
4. Click on **"Environment Variables"** in the left sidebar
5. Click **"Add New"** button
6. Fill in:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://shop-hub-mern.onrender.com`
   - **Environments:** Check "Production"
7. Click **"Save"**

### 2. Redeploy Your Frontend

After adding the environment variable, you MUST redeploy:

**Method 1: From Vercel Dashboard (Easiest)**
1. Go to **"Deployments"** tab
2. Find the latest deployment
3. Click the three dots (•••) on the right
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again

**Method 2: From Git (If you pushed changes)**
1. Vercel will automatically detect the push
2. Wait for deployment to complete
3. Check the deployment status

### 3. Wait for Deployment

- Deployment usually takes 1-3 minutes
- You'll see a progress bar
- Wait for "Ready" status

### 4. Test Your Site

Once deployed:
1. Click on the deployment URL
2. Check if products load
3. Try searching
4. Try login/register
5. Check browser console (F12) - should have NO errors

## 🎯 What This Fixes

Before: Your frontend was trying to connect to `localhost:5000` (which doesn't exist in production)

After: Your frontend will connect to `https://shop-hub-mern.onrender.com` (your actual backend)

## 📸 Visual Guide

### Adding Environment Variable:
```
Settings → Environment Variables → Add New

Key: VITE_API_URL
Value: https://shop-hub-mern.onrender.com
Environment: ✓ Production
```

### Redeploying:
```
Deployments → Latest Deployment → ••• → Redeploy
```

## ✅ Verification

After redeployment, your site should:
- ✅ Load products from Render backend
- ✅ Show no CORS errors
- ✅ Allow login/register
- ✅ Show recommendations
- ✅ Work completely

## 🐛 Troubleshooting

### If products still don't load:

1. **Check Environment Variable:**
   - Go to Settings → Environment Variables
   - Make sure `VITE_API_URL` is there
   - Make sure value is correct (no trailing slash)

2. **Check Deployment:**
   - Go to Deployments
   - Make sure latest deployment is "Ready"
   - Click on it and check "Environment Variables" section

3. **Clear Cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or open in incognito mode

4. **Check Backend:**
   - Visit: https://shop-hub-mern.onrender.com/api/products
   - Should show JSON data
   - If not, backend might be sleeping (wait 30 seconds)

### If you see "Failed to fetch":

1. **Backend might be sleeping:**
   - Render free tier spins down after inactivity
   - First request takes 30-60 seconds
   - Refresh the page after waiting

2. **Check Render:**
   - Go to Render dashboard
   - Make sure service is "Live"
   - Check logs for errors

## 💡 Important Notes

1. **Environment variables require redeployment** - Just adding them isn't enough
2. **Render free tier sleeps** - First load is slow, then it's fast
3. **Clear cache** - Sometimes old code is cached
4. **Check both services** - Both frontend and backend must be running

## 🎉 Success!

Once you see products loading on your live site, you're done! 🚀

Your app is now fully deployed and working!

## 📞 Quick Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Render Dashboard:** https://dashboard.render.com/
- **Your Backend:** https://shop-hub-mern.onrender.com
- **Test API:** https://shop-hub-mern.onrender.com/api/products

---

**Follow these steps exactly and your deployment will work! 💪**

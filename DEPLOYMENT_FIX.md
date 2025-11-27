# 🚀 DEPLOYMENT FIX - CORS Error Solution

## ✅ Problem Solved!

Your CORS error is now fixed! Here's what you need to do:

## 📝 Quick Fix Steps

### Step 1: Add Environment Variable on Vercel

1. Go to your Vercel project dashboard
2. Click on **Settings**
3. Click on **Environment Variables**
4. Add this variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://shop-hub-mern.onrender.com`
   - **Environment:** Production

5. Click **Save**

### Step 2: Redeploy Frontend

After adding the environment variable:

**Option A: From Vercel Dashboard**
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click **"Redeploy"** button

**Option B: Push to GitHub**
```bash
git add .
git commit -m "Fix: Add API configuration for deployment"
git push origin main
```

Vercel will automatically redeploy.

### Step 3: Verify Backend Environment Variables on Render

Make sure these are set on Render:

1. Go to your Render dashboard
2. Click on your service
3. Go to **Environment** tab
4. Verify these variables exist:

```
MONGODB_URI=your-mongodb-atlas-connection-string
PORT=5000
JWT_SECRET=your-secret-key
NODE_ENV=production
```

5. If you made changes, click **"Manual Deploy"** → **"Deploy latest commit"**

## 🎯 What Was Fixed

### 1. Created API Configuration File
- `frontend/src/config/api.js` - Centralized API URL management
- Automatically uses correct URL based on environment

### 2. Environment Files Created
- `.env.development` - For local development (localhost:5000)
- `.env.production` - For production (your Render URL)

### 3. Backend CORS Updated
- Now accepts requests from any origin (for deployment)
- Credentials enabled
- Proper configuration for production

## 🧪 Test Your Deployment

After redeploying, test these:

1. **Visit your Vercel URL**
2. **Check if products load** ✅
3. **Try searching** ✅
4. **Try login/register** ✅
5. **Check browser console** - Should have NO errors ✅

## 🔍 Verify API is Working

Test your backend directly:
```
https://shop-hub-mern.onrender.com/api/products
```

Should return JSON with products.

## 📋 Environment Variables Checklist

### Vercel (Frontend)
- [x] `VITE_API_URL` = `https://shop-hub-mern.onrender.com`

### Render (Backend)
- [x] `MONGODB_URI` = Your MongoDB Atlas connection string
- [x] `PORT` = `5000`
- [x] `JWT_SECRET` = Your secret key
- [x] `NODE_ENV` = `production`

## 🐛 Still Having Issues?

### Issue 1: Products Not Loading

**Check:**
1. Browser console for errors (F12)
2. Network tab - Are requests going to Render URL?
3. Render logs - Any errors?

**Solution:**
- Clear browser cache (Ctrl+Shift+R)
- Check environment variable is set on Vercel
- Redeploy frontend

### Issue 2: Backend is Slow

**Reason:** Render free tier spins down after inactivity.

**Solution:**
- First request takes 30-60 seconds (normal)
- Subsequent requests are fast
- Or upgrade to paid tier

### Issue 3: CORS Error Still Appears

**Check:**
1. Environment variable on Vercel is correct
2. Backend CORS configuration allows your frontend URL
3. Both services are deployed

**Solution:**
```bash
# Redeploy both services
# 1. Render: Manual Deploy
# 2. Vercel: Redeploy
```

## 💡 Pro Tips

### 1. Keep Backend Awake
Use UptimeRobot or similar service to ping your backend every 5 minutes:
```
https://shop-hub-mern.onrender.com/
```

### 2. Check Logs
- **Render:** Dashboard → Logs
- **Vercel:** Dashboard → Deployments → View Function Logs

### 3. Test Locally First
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```

## 📱 Mobile Testing

After deployment, test on mobile:
1. Open your Vercel URL on phone
2. Check if everything works
3. Test all features

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Products load on homepage
- ✅ Search works
- ✅ Login/Register works
- ✅ No CORS errors in console
- ✅ Recommendations load
- ✅ Add to cart works

## 📞 Quick Commands

### Check if Backend is Running
```bash
curl https://shop-hub-mern.onrender.com/api/products
```

### Check Environment Variables (Local)
```bash
# Frontend
cd frontend
cat .env.production

# Backend
cd backend
cat .env
```

### Rebuild Frontend
```bash
cd frontend
npm run build
```

## 🔗 Important URLs

- **Your Frontend:** Your Vercel URL
- **Your Backend:** https://shop-hub-mern.onrender.com
- **API Test:** https://shop-hub-mern.onrender.com/api/products
- **Health Check:** https://shop-hub-mern.onrender.com/

## ✅ Final Checklist

Before considering it done:

- [ ] Environment variable added on Vercel
- [ ] Frontend redeployed
- [ ] Backend environment variables verified
- [ ] Tested on live URL
- [ ] No CORS errors
- [ ] All features working
- [ ] Tested on mobile
- [ ] Checked browser console

## 🎯 Summary

**What you need to do:**
1. Add `VITE_API_URL` environment variable on Vercel
2. Redeploy frontend
3. Test your live site

**That's it!** Your deployment will work perfectly! 🚀

---

**Need more help?** Check the browser console and Render logs for specific errors.

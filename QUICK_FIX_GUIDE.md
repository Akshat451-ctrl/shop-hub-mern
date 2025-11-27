# ⚡ QUICK FIX - 2 Minutes to Fix Your Deployment

## 🎯 The Problem

Your frontend is trying to connect to `localhost:5000` instead of your deployed backend at `https://shop-hub-mern.onrender.com`

## ✅ The Solution (2 Steps)

### Step 1: Add Environment Variable on Vercel (1 minute)

1. Go to https://vercel.com/dashboard
2. Click your project
3. Click **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   ```
   Name: VITE_API_URL
   Value: https://shop-hub-mern.onrender.com
   ```
6. Select **Production**
7. Click **Save**

### Step 2: Redeploy (1 minute)

1. Go to **Deployments** tab
2. Click latest deployment
3. Click **Redeploy** button
4. Wait 1-2 minutes

## 🎉 Done!

Your site will now work perfectly!

## 🧪 Test It

Visit your Vercel URL and check:
- ✅ Products load
- ✅ Search works
- ✅ Login works
- ✅ No errors in console (F12)

## 🐛 Still Not Working?

### If products don't load:
1. Wait 30 seconds (Render backend might be waking up)
2. Refresh the page
3. Check browser console (F12) for errors

### If you see CORS error:
1. Make sure you added the environment variable
2. Make sure you redeployed AFTER adding it
3. Clear browser cache (Ctrl+Shift+R)

## 📞 Need More Help?

Check these detailed guides:
- **DEPLOYMENT_FIX.md** - Complete troubleshooting
- **VERCEL_SETUP.md** - Step-by-step with screenshots
- **DEPLOYMENT_GUIDE.md** - Full deployment guide

---

**That's it! Just 2 steps and you're done! 🚀**

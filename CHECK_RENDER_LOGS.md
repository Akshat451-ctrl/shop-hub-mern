# 🔍 How to Check Render Logs

## Step-by-Step Guide

### 1. Go to Render Dashboard

Visit: https://dashboard.render.com/

### 2. Find Your Service

Click on your service: **shop-hub-mern**

### 3. Open Logs Tab

Click on the **"Logs"** tab at the top

### 4. Look for Errors

Scroll through the logs and look for:

#### ✅ Good Signs:
```
MongoDB Connected Successfully
Server running on port 5000
```

#### ❌ Bad Signs (Errors):
```
MongooseServerSelectionError
Cannot find module
Error: ...
UnhandledPromiseRejectionWarning
```

## Common Errors & Solutions

### Error 1: "MongooseServerSelectionError"

**Means:** Can't connect to MongoDB

**Fix:**
1. Check MongoDB Atlas IP whitelist has `0.0.0.0/0`
2. Check connection string is correct
3. Check MongoDB Atlas cluster is active

### Error 2: "Cannot find module"

**Means:** Missing dependency or wrong import

**Fix:**
1. Check all imports have `.js` extension
2. Redeploy to reinstall dependencies

### Error 3: "Collection not found" or "No documents"

**Means:** Database is empty

**Fix:**
Run seed command:
```bash
cd backend
npm run seed
```

### Error 4: "Port already in use"

**Means:** Port conflict (rare on Render)

**Fix:**
Render handles this automatically, just redeploy

## What to Look For

### Startup Sequence (Should See):

```
> shophub-backend@1.0.0 start
> node server.js

MongoDB Connected Successfully (Atlas/Render Ready)
Server running on port 5000
Live API → https://your-backend.onrender.com
JWT_SECRET configured (length=XX)
```

### If You See This:

```
MongoDB connection failed: ...
```

Then MongoDB is the problem.

### If You See This:

```
Error: Cannot find module './routes/products'
```

Then there's a code issue.

## Copy the Error

1. Find the error message in logs
2. Copy the entire error (including stack trace)
3. Send it to me or use it to debug

## Quick Test

After checking logs, test these URLs:

1. **Health Check:**
```
https://shop-hub-mern.onrender.com/
```

2. **Products API:**
```
https://shop-hub-mern.onrender.com/api/products
```

## What Each Response Means

### Response: JSON with products
✅ **Everything is working!**
- Database is connected
- Database is seeded
- API is working

### Response: 500 Internal Server Error
❌ **Backend is crashing**
- Check Render logs for error
- Most likely: database not seeded

### Response: CORS error
❌ **Backend is crashing before CORS headers are sent**
- Fix the 500 error first
- CORS will work automatically after

### Response: Cannot GET /api/products
❌ **Wrong URL or routes not configured**
- Check URL is correct
- Check routes are imported in server.js

## Next Steps

Based on what you see in logs:

1. **If MongoDB connection failed:**
   - Check Atlas IP whitelist
   - Check connection string
   - Check Atlas cluster is active

2. **If "Cannot find module":**
   - Check imports have `.js` extension
   - Redeploy

3. **If no errors but 500:**
   - Database is probably empty
   - Run seed command

4. **If everything looks good:**
   - Test the API URL directly
   - Check if products are returned

---

**Check your Render logs and tell me what error you see! 🔍**

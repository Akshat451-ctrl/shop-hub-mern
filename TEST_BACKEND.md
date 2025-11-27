# 🧪 Test Your Backend - Step by Step

## Test 1: Check if Backend is Running

Open this URL in your browser:
```
https://shop-hub-mern.onrender.com/
```

### Expected Result:
```json
{
  "success": true,
  "message": "ShopHub API is LIVE!",
  "database": "Connected"
}
```

### If You See:
- ✅ **JSON response** → Backend is running
- ❌ **500 error** → Backend is crashing
- ❌ **Cannot connect** → Backend is down

## Test 2: Check Products API

Open this URL:
```
https://shop-hub-mern.onrender.com/api/products
```

### Expected Result:
JSON array with 20 products

### If You See:
- ✅ **Array of products** → Everything works!
- ❌ **Empty array []** → Database is empty, need to seed
- ❌ **500 error** → Backend is crashing
- ❌ **CORS error** → Backend crashed before sending CORS headers

## Test 3: Check Database Status

Open this URL:
```
https://shop-hub-mern.onrender.com/__status
```

### Expected Result:
```json
{
  "success": true,
  "environment": "production",
  "jwtConfigured": true,
  "dbConnected": true,
  "port": 5000
}
```

### What Each Field Means:
- `jwtConfigured: true` → JWT_SECRET is set ✅
- `dbConnected: true` → MongoDB is connected ✅
- `dbConnected: false` → MongoDB connection failed ❌

## Test 4: Seed Database (If Empty)

If products API returns empty array or error:

### From Your Computer:
```bash
cd backend
npm run seed
```

### From Render Shell:
1. Go to Render dashboard
2. Click "Shell" tab
3. Run: `npm run seed`

## Test 5: Check Render Logs

1. Go to https://dashboard.render.com/
2. Click your service
3. Click "Logs" tab
4. Look for errors

### Good Logs:
```
MongoDB Connected Successfully
Server running on port 5000
```

### Bad Logs:
```
MongoDB connection failed
Error: Cannot find module
UnhandledPromiseRejectionWarning
```

## Quick Diagnosis

### Scenario 1: Backend Returns 500 Error

**Problem:** Backend is crashing
**Solution:** 
1. Check Render logs for error
2. Most likely: database not seeded
3. Run: `npm run seed`

### Scenario 2: CORS Error

**Problem:** Backend crashed before sending CORS headers
**Solution:**
1. Fix the 500 error first
2. CORS will work automatically

### Scenario 3: Empty Array

**Problem:** Database is empty
**Solution:**
Run seed command

### Scenario 4: MongoDB Connection Failed

**Problem:** Can't connect to MongoDB Atlas
**Solution:**
1. Check IP whitelist (0.0.0.0/0)
2. Check connection string
3. Check Atlas cluster is active

## Complete Test Sequence

Run these tests in order:

```bash
# Test 1: Health check
curl https://shop-hub-mern.onrender.com/

# Test 2: Products API
curl https://shop-hub-mern.onrender.com/api/products

# Test 3: Status check
curl https://shop-hub-mern.onrender.com/__status

# Test 4: Recommendations
curl https://shop-hub-mern.onrender.com/api/recommendations
```

## What Success Looks Like

All these should work:

1. ✅ Health check returns success
2. ✅ Products API returns 20 products
3. ✅ Status shows database connected
4. ✅ Recommendations return products
5. ✅ No CORS errors
6. ✅ Frontend loads products

## What Failure Looks Like

Any of these means there's a problem:

1. ❌ 500 Internal Server Error
2. ❌ CORS policy error
3. ❌ Empty array []
4. ❌ Cannot connect
5. ❌ Database disconnected

## Fix Priority

Fix in this order:

1. **First:** Make sure MongoDB is connected
2. **Second:** Seed the database
3. **Third:** Test APIs work
4. **Fourth:** Test frontend

## Need Help?

Tell me the results of:

1. What do you see at: https://shop-hub-mern.onrender.com/
2. What do you see at: https://shop-hub-mern.onrender.com/api/products
3. What errors are in Render logs?

---

**Test your backend and tell me what you see! 🧪**

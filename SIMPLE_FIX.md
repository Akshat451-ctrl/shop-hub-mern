# ⚡ SIMPLE FIX - 1 Command

## Your Situation

✅ MongoDB connection string: Correct
✅ Environment variables on Render: Set
✅ Frontend connecting to backend: Working
❌ Database: Empty (not seeded)

## The Fix

Run this ONE command to seed your database:

### From Your Computer:

```bash
cd backend
npm run seed
```

Make sure your `backend/.env` has:
```env
MONGODB_URI=mongodb+srv://statusdekho3:Akshat123@cluster0.bqh7iqm.mongodb.net/shophub?retryWrites=true&w=majority
```

### Expected Output:

```
✅ Connected to MongoDB
🗑️  Cleared existing products
✅ Successfully seeded 20 products
👋 Database connection closed
```

## Test It

After seeding, visit:
```
https://shop-hub-mern.onrender.com/api/products
```

Should return 20 products (not 500 error).

## Your Frontend

Visit your Vercel URL - products will load! ✅

## That's It!

Just seed the database and everything works!

---

**One command. One minute. Done! 🚀**

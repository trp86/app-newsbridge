# Quick Start: Deploy NewsBridge in 10 Minutes

## What You'll Deploy
- **Backend**: FastAPI + Python on Render (Free tier)
- **Database**: Already have Neon Postgres ✅
- **Frontend**: Next.js on Vercel (Free tier)
- **Total Cost**: $0/month

---

## Step 1: Deploy Backend (5 minutes)

### A. Open Render
1. Go to **https://render.com**
2. Click "Get Started for Free"
3. Sign up with your GitHub account

### B. Create Web Service
1. Click **"New +"** button → **"Web Service"**
2. Click **"Connect a repository"**
3. Find and select: **`trp86/app-newsbridge`**
4. Click **"Connect"**

### C. Configure Service
Fill in these settings:

- **Name**: `newsbridge-backend` (or any name you like)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`
- **Build Command**:
  ```
  pip install uv && uv pip install --system -r pyproject.toml
  ```
- **Start Command**:
  ```
  uvicorn src.api.main:app --host 0.0.0.0 --port $PORT
  ```
- **Instance Type**: `Free`

### D. Add Environment Variables

**IMPORTANT**: Click "Advanced" → "Add Environment Variable"

Add these **7 required variables** (get values from your `backend/.env` file):

1. `DATABASE_URL` = (copy from your .env)
2. `GEMINI_API_KEY` = (copy from your .env)
3. `GEMINI_SUMMARIZATION_MODEL` = `gemini-2.5-flash`
4. `GEMINI_TRANSLATION_MODEL` = `gemini-1.5-flash-002`
5. `PORT` = `8002`
6. `LOG_LEVEL` = `INFO`
7. `LOG_FORMAT` = `json`

### E. Deploy!
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for first deployment
3. ✅ **Copy your backend URL**: `https://newsbridge-backend-xxxx.onrender.com`
4. Test it: Open `https://your-backend-url.onrender.com/health` - should show JSON response

---

## Step 2: Deploy Frontend (3 minutes)

### A. Open Vercel
1. Go to **https://vercel.com**
2. Click "Start Deploying"
3. Sign up with your GitHub account

### B. Import Project
1. Click **"Add New..."** → **"Project"**
2. Under "Import Git Repository", find: **`trp86/app-newsbridge`**
3. Click **"Import"**

### C. Configure Project
- **Framework Preset**: Next.js (auto-detected) ✅
- **Root Directory**: Click "Edit" → Type `frontend` → Click "Continue"
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `.next` (auto-filled)

### D. Add Environment Variable
Click **"Environment Variables"** section:

Add this **1 variable**:
- **Name**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://your-backend-url-from-step1.onrender.com`
  (Use the URL you copied from Render in Step 1E)

### E. Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. ✅ **Your app is live!** Click the URL to visit it
4. Example: `https://newsbridge-xxxx.vercel.app`

---

## Step 3: Connect Everything (2 minutes)

### A. Update CORS in Backend

Your frontend needs permission to call your backend API.

**Option 1: Quick via GitHub (Recommended)**

1. Open `backend/src/api/main.py` in your editor
2. Find the `allow_origins` list (around line 26)
3. Add your Vercel URL:
   ```python
   allow_origins=[
       "http://localhost:3000",
       "http://localhost:3001",
       "http://localhost:3002",
       "http://localhost:3003",
       "https://newsbridge-xxxx.vercel.app",  # ← Add your Vercel URL here
   ],
   ```
4. Save, commit, and push:
   ```bash
   git add backend/src/api/main.py
   git commit -m "fix: Add production frontend URL to CORS"
   git push
   ```
5. Render will automatically redeploy (takes 3-5 minutes)

**Option 2: Via Render Dashboard**

1. Go to Render Dashboard → Your Service → Environment
2. Add new variable:
   - Name: `CORS_ORIGINS`
   - Value: `https://your-vercel-url.vercel.app`
3. Click "Save Changes"
4. Wait for automatic redeploy

### B. Test Your Live App! 🎉

Visit your Vercel URL and check:
- ✅ Homepage loads
- ✅ Articles display (not just static data)
- ✅ Click an article - it opens
- ✅ Language switcher works (EN ↔ ଓଡ଼ିଆ)
- ✅ On article page, clicking "EN" stays on same article

**Check Browser Console** (F12 → Console tab):
- ✅ Should see: `[getArticles] Successfully fetched X articles from API`
- ❌ Should NOT see: CORS errors or timeout errors

---

## 🎉 You're Done!

Your app is now live and accessible worldwide!

- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-backend.onrender.com
- **Database**: Neon Postgres (already set up)

---

## ⚠️ Important: Free Tier Limitations

### Render Free Tier:
- **Spins down after 15 minutes** of inactivity
- First request after sleep takes **30-60 seconds** to wake up
- **Solution**: Upgrade to paid tier ($7/month) for always-on, or accept the cold start

### Neon Free Tier:
- **0.5 GB storage**
- **3 GB data transfer/month**
- Scales automatically, very generous for MVP

### Vercel Free Tier:
- **Unlimited** for personal projects
- No cold starts, always fast!

---

## Next Steps

1. ✅ **Share your app** with friends!
2. ✅ **Set up custom domain** (optional)
   - Vercel: Dashboard → Settings → Domains
   - Add your domain and follow DNS instructions
3. ✅ **Monitor usage**
   - Render: Dashboard → Metrics
   - Neon: Console → Monitoring
   - Vercel: Dashboard → Analytics
4. ✅ **Upgrade when needed**
   - Render Starter: $7/month (no sleep)
   - Neon Scale: $19/month (more resources)

---

## Troubleshooting

### Backend Not Loading?
- Check Render logs: Dashboard → Logs tab
- Verify all 7 environment variables are set
- Test: `curl https://your-backend.onrender.com/health`

### Articles Not Loading?
- Open browser console (F12)
- Look for error messages
- Check if `NEXT_PUBLIC_API_URL` is correct in Vercel
- Verify CORS is updated in backend

### CORS Errors?
- Make sure you added Vercel URL to `allow_origins` in `backend/src/api/main.py`
- Push changes to GitHub
- Wait for Render to redeploy

### Still Having Issues?
Check the detailed guide: **[DEPLOY_RENDER_VERCEL.md](DEPLOY_RENDER_VERCEL.md)**

---

## Need Help?

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs

Good luck! 🚀

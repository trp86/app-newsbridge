# Deployment Checklist for Render + Vercel

## Before You Start
- [ ] Code pushed to GitHub
- [ ] Neon database connection string ready (from Neon console)
- [ ] Google Gemini API key ready (from https://makersuite.google.com/app/apikey)
- [ ] Telegram Bot Token (optional, from @BotFather on Telegram)

---

## Backend on Render

### Setup (5 minutes)
- [ ] Sign up at https://render.com with GitHub
- [ ] Create New Web Service
- [ ] Connect GitHub repo: `trp86/app-newsbridge`
- [ ] Configure:
  - Root Directory: `backend`
  - Build Command: `./render-build.sh` or `pip install uv && uv pip install --system -r pyproject.toml`
  - Start Command: `uvicorn src.api.main:app --host 0.0.0.0 --port $PORT`
  - Plan: Free

### Environment Variables (Required)
- [ ] `DATABASE_URL` = (your Neon connection string)
- [ ] `GEMINI_API_KEY` = (your Google Gemini API key)
- [ ] `GEMINI_SUMMARIZATION_MODEL` = `gemini-2.5-flash`
- [ ] `GEMINI_TRANSLATION_MODEL` = `gemini-1.5-flash-002`
- [ ] `PORT` = `8002`
- [ ] `LOG_LEVEL` = `INFO`
- [ ] `LOG_FORMAT` = `json`

### Environment Variables (Optional)
- [ ] `TELEGRAM_BOT_TOKEN` = (your Telegram bot token, if using)
- [ ] `TELEGRAM_CHANNEL_ID` = (your channel ID, if using)
- [ ] `DAILY_PUBLISH_TIME` = `06:00`
- [ ] `MAX_RETRIES_PER_MODEL` = `2`
- [ ] `REQUEST_TIMEOUT_SECONDS` = `30`
- [ ] `MIN_QUALITY_SCORE` = `0.7`
- [ ] `TOP_STORIES_COUNT` = `5`

### Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes)
- [ ] Note your backend URL: `https://newsbridge-backend.onrender.com`
- [ ] Test: Visit `https://your-backend-url.onrender.com/health`

---

## Frontend on Vercel

### Setup (3 minutes)
- [ ] Sign up at https://vercel.com with GitHub
- [ ] Click "Add New" → "Project"
- [ ] Import `trp86/app-newsbridge`
- [ ] Configure:
  - Root Directory: `frontend`
  - Framework: Next.js (auto-detected)

### Environment Variables
- [ ] `NEXT_PUBLIC_API_URL` = `https://your-render-backend-url.onrender.com`

### Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Note your frontend URL: `https://newsbridge-xxx.vercel.app`

---

## Connect Everything

### Update CORS
- [ ] Edit `backend/src/api/main.py`
- [ ] Add your Vercel URL to `allow_origins` list
- [ ] Commit and push to GitHub:
  ```bash
  git add backend/src/api/main.py
  git commit -m "fix: Add production CORS origin"
  git push
  ```
- [ ] Wait for Render to auto-deploy

### Test Complete Flow
- [ ] Visit your Vercel URL
- [ ] Homepage loads ✅
- [ ] Articles display ✅
- [ ] Language switching works (EN ↔ ଓଡ଼ିଆ) ✅
- [ ] Article pages load ✅
- [ ] Check browser console - no CORS errors ✅

---

## Optional: Custom Domain

### Frontend Domain
- [ ] Vercel Dashboard → Settings → Domains
- [ ] Add your domain
- [ ] Update DNS records

### Backend Domain
- [ ] Render Dashboard → Settings → Custom Domains
- [ ] Add subdomain (e.g., `api.newsbridge.com`)
- [ ] Update DNS CNAME

---

## Done! 🎉

Your app is live:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com

Share it with the world! 🚀

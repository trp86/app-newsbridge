# Deploy NewsBridge to Render + Neon + Vercel

## Prerequisites
- ✅ GitHub repository with code pushed
- ✅ Neon database already set up
- ✅ Google Gemini API key
- ✅ Telegram Bot Token (optional, for notifications)

---

## Part 1: Deploy Backend to Render

### 1. Sign Up for Render
- Go to https://render.com
- Sign up with GitHub

### 2. Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `trp86/app-newsbridge`
3. Configure service:
   - **Name**: `newsbridge-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: 
     ```bash
     pip install uv && uv pip install --system -r pyproject.toml
     ```
   - **Start Command**: 
     ```bash
     uvicorn src.api.main:app --host 0.0.0.0 --port $PORT
     ```
   - **Plan**: Free

### 3. Add Environment Variables
In Render dashboard, add these environment variables:

**Required:**
```
DATABASE_URL=postgresql://neondb_owner:xxx@ep-xxx.neon.tech/neondb?sslmode=require
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_SUMMARIZATION_MODEL=gemini-2.5-flash
GEMINI_TRANSLATION_MODEL=gemini-1.5-flash-002
PORT=8002
LOG_LEVEL=INFO
LOG_FORMAT=json
```

**Optional (for Telegram notifications):**
```
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHANNEL_ID=@your_channel
```

**Optional (advanced settings):**
```
DAILY_PUBLISH_TIME=06:00
MAX_RETRIES_PER_MODEL=2
REQUEST_TIMEOUT_SECONDS=30
MIN_QUALITY_SCORE=0.7
TOP_STORIES_COUNT=5
```

**Get your Neon connection string:**
1. Go to https://console.neon.tech
2. Select your project
3. Copy the connection string (looks like: `postgresql://user:pass@ep-xxx.neon.tech/newsbridge`)

### 4. Deploy
- Click "Create Web Service"
- Wait 5-10 minutes for first deploy
- Your backend URL will be: `https://newsbridge-backend.onrender.com`

### 5. Update CORS
After deployment, update CORS in your code:
- Edit `backend/src/api/main.py`
- Add your Vercel domain to `allow_origins` (we'll get this in Part 2)

---

## Part 2: Deploy Frontend to Vercel

### 1. Sign Up for Vercel
- Go to https://vercel.com
- Sign up with GitHub

### 2. Import Project
1. Click "Add New..." → "Project"
2. Import `trp86/app-newsbridge`
3. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (auto)
   - **Install Command**: `npm install`

### 3. Add Environment Variables
Click "Environment Variables" and add:

```
NEXT_PUBLIC_API_URL=https://newsbridge-backend.onrender.com
```

*(Replace with your actual Render backend URL from Part 1)*

### 4. Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Your frontend URL will be: `https://newsbridge-xxx.vercel.app`

---

## Part 3: Connect Everything

### 1. Update Backend CORS

**Option A: Via GitHub (Recommended)**

Edit `backend/src/api/main.py` and update CORS:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "https://newsbridge-xxx.vercel.app",  # Add your Vercel URL
        "https://your-custom-domain.com",     # If you have one
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Push to GitHub:
```bash
git add backend/src/api/main.py
git commit -m "fix: Add production CORS origins"
git push
```

Render will automatically redeploy.

**Option B: Environment Variable (Alternative)**

If you prefer environment-based CORS:

1. Edit `backend/src/api/main.py`:
```python
import os

allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
]

# Add production origins from environment
if os.getenv("CORS_ORIGINS"):
    allowed_origins.extend(os.getenv("CORS_ORIGINS").split(","))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

2. Add environment variable in Render:
```
CORS_ORIGINS=https://newsbridge-xxx.vercel.app
```

### 2. Update Neon Database

Make sure your Neon database allows connections from Render:

1. Go to Neon Console → Project → Settings
2. Under "IP Allow" → Select "Allow all" (Render uses dynamic IPs)
3. Or add Render's IP ranges if available

### 3. Test Your Deployment

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Articles display
- ✅ Language switching works (EN ↔ ଓଡ଼ିଆ)
- ✅ Article pages load
- ✅ No CORS errors in browser console

---

## Part 4: Custom Domain (Optional)

### For Frontend (Vercel)
1. Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain (e.g., `newsbridge.com`)
3. Update DNS records as shown

### For Backend (Render)
1. Render Dashboard → Service → Settings → Custom Domains
2. Add subdomain (e.g., `api.newsbridge.com`)
3. Update DNS CNAME record

---

## Troubleshooting

### Backend Issues

**Build fails on Render:**
```bash
# Check if pyproject.toml is in backend directory
# Verify build command uses uv correctly
```

**Database connection errors:**
- Verify DATABASE_URL in Render environment variables
- Check Neon IP allowlist
- Ensure database is not sleeping (free tier sleeps after inactivity)

**API returns 500 errors:**
```bash
# Check Render logs
# Go to Render Dashboard → Logs tab
```

### Frontend Issues

**API calls fail:**
- Check browser console for CORS errors
- Verify `NEXT_PUBLIC_API_URL` in Vercel environment variables
- Confirm backend CORS includes Vercel domain

**Environment variables not working:**
- Redeploy after adding environment variables
- Variables must start with `NEXT_PUBLIC_` for client-side access

### Render Free Tier Limitations

⚠️ **Important**: Render free tier spins down after 15 minutes of inactivity
- First request after inactivity takes 30-60 seconds to wake up
- Consider upgrading to paid tier ($7/month) for always-on service

**Solution for free tier:**
- Set up uptime monitoring (e.g., UptimeRobot) to ping every 10 minutes
- Or accept the cold start delay

---

## Monitoring

### Render Logs
```bash
# View real-time logs in Render dashboard
# Or use Render CLI:
render logs -s newsbridge-backend
```

### Vercel Logs
- Go to Vercel Dashboard → Deployments → Click deployment → Logs

### Neon Metrics
- Neon Console → Monitoring tab
- Check connection count and query performance

---

## Cost Summary

### Current Setup (All Free)
- **Render**: Free tier (750 hours/month)
- **Neon**: Free tier (0.5 GB storage, 3 GB data transfer)
- **Vercel**: Free tier (hobby projects)
- **Total**: $0/month

### Production Upgrade
- **Render**: Starter ($7/month) - No spin down
- **Neon**: Scale tier ($19/month) - More storage & compute
- **Vercel**: Free or Pro ($20/month) - If you need more
- **Total**: $26-46/month

---

## Next Steps After Deployment

1. ✅ Test all features thoroughly
2. ✅ Set up custom domain
3. ✅ Configure Render to not sleep (upgrade or use ping service)
4. ✅ Set up monitoring/alerting
5. ✅ Add Google Analytics (optional)
6. ✅ Share your app! 🎉

---

## Quick Commands Reference

```bash
# Deploy backend updates (push to GitHub, Render auto-deploys)
git add .
git commit -m "Update backend"
git push

# Deploy frontend updates (push to GitHub, Vercel auto-deploys)
git add .
git commit -m "Update frontend"
git push

# View Render logs
render logs -s newsbridge-backend

# Redeploy Vercel manually
vercel --prod
```

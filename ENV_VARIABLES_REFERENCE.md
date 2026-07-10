# Environment Variables Reference

## Your Current Setup

### Backend Environment Variables

Copy these to your Render dashboard:

#### ✅ Required Variables

```bash
# Database - Neon Postgres (get from your backend/.env file)
DATABASE_URL=postgresql://your_username:your_password@your_host.neon.tech/neondb?sslmode=require

# Google Gemini API (get from your backend/.env file)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_SUMMARIZATION_MODEL=gemini-2.5-flash
GEMINI_TRANSLATION_MODEL=gemini-1.5-flash-002

# Server Configuration
PORT=8002
LOG_LEVEL=INFO
LOG_FORMAT=json
```

#### 🔧 Optional Variables (Advanced Features)

```bash
# Telegram Integration (if you want notifications)
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
TELEGRAM_CHANNEL_ID=@your_channel_name

# Scheduling & Performance
DAILY_PUBLISH_TIME=06:00
MAX_RETRIES_PER_MODEL=2
REQUEST_TIMEOUT_SECONDS=30

# Content Quality
MIN_QUALITY_SCORE=0.7
TOP_STORIES_COUNT=5
```

---

## Frontend Environment Variables

Copy these to your Vercel dashboard:

```bash
# Backend API URL (update this after deploying backend to Render)
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
```

---

## How to Get These Keys

### 1. Neon Database URL
✅ **You already have this in your `backend/.env` file!**
- Found in: Neon Console → Connection String
- Format: `postgresql://username:password@host.neon.tech/neondb?sslmode=require`

### 2. Google Gemini API Key
✅ **You already have this in your `backend/.env` file!**
- Get more keys at: https://makersuite.google.com/app/apikey
- Free tier: 1,500 requests/day
- Format: Starts with `AQ.` or `AIza...`

### 3. Telegram Bot Token (Optional)
❌ **Not configured yet** (Only if you want Telegram notifications)
- How to get:
  1. Open Telegram and message @BotFather
  2. Send `/newbot` and follow instructions
  3. Copy the token (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

---

## Security Notes

⚠️ **IMPORTANT**: These are your actual production keys. Keep them secret!

### Never commit these to GitHub:
- ✅ They're in `.env` file (already in `.gitignore`)
- ✅ Add them manually in Render/Vercel dashboards
- ❌ Never put them in code files
- ❌ Never share them publicly

### Rotating Keys:
If you accidentally expose a key:
1. **Gemini API**: Create new key at https://makersuite.google.com/app/apikey
2. **Database**: Regenerate connection string in Neon Console
3. **Telegram**: Message @BotFather and use `/revoke`

---

## Quick Copy-Paste for Render

When setting up Render, add these one by one in the Environment Variables section:

**💡 Get these values from your `backend/.env` file**

| Variable Name | Value |
|--------------|-------|
| `DATABASE_URL` | Copy from your `.env` file |
| `GEMINI_API_KEY` | Copy from your `.env` file |
| `GEMINI_SUMMARIZATION_MODEL` | `gemini-2.5-flash` |
| `GEMINI_TRANSLATION_MODEL` | `gemini-1.5-flash-002` |
| `PORT` | `8002` |
| `LOG_LEVEL` | `INFO` |
| `LOG_FORMAT` | `json` |

---

## Quick Copy-Paste for Vercel

After you deploy backend to Render and get the URL:

| Variable Name | Value |
|--------------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend-name.onrender.com` |

---

## Verification

After deployment, test that environment variables are loaded:

### Backend Health Check
Visit: `https://your-backend.onrender.com/health`

Should return:
```json
{
  "status": "healthy",
  "database": {
    "connected": true,
    "article_count": 123,
    "brief_count": 45,
    "translation_count": 90
  }
}
```

### Frontend Check
- Open browser console
- Look for: `[getArticles] Fetching from: https://your-backend.onrender.com/api/articles`
- Should NOT see CORS errors

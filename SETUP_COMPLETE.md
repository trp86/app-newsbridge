# Setup Complete ✅

## 🪟 Windows Users Note

This guide supports **three** command-line environments:
- **PowerShell** (Recommended for Windows 11) - Use `.\venv\Scripts\Activate.ps1`
- **Git Bash** (POSIX-like) - Use `source venv/Scripts/activate`
- **CMD** (Classic) - Use `venv\Scripts\activate.bat`

Commands are shown for both PowerShell and Git Bash where they differ.

## Environment Setup

### Python Virtual Environment
- **Location**: `backend/venv/`
- **Python Version**: 3.12.10
- **Status**: ✅ Created and activated

### Dependencies Installed
All project dependencies are installed:
- ✅ `pydantic` 2.13.4 (data validation)
- ✅ `psycopg` 3.3.4 (Postgres driver)
- ✅ `google-generativeai` 0.8.6 (Gemini API)
- ✅ `python-telegram-bot` 22.8 (Telegram integration)
- ✅ `feedparser` 6.0.12 (RSS parsing)
- ✅ `structlog` 26.1.0 (logging)
- ✅ Plus dev tools: `pytest`, `mypy`, `ruff`

## Database Setup

### Neon Postgres
- **Status**: ✅ Connected and initialized
- **Connection**: eu-central-1 AWS region
- **Tables Created**: 6 tables with indexes
  - `articles` (0 rows)
  - `briefs` (0 rows)
  - `translations` (0 rows)
  - `publications` (0 rows)
  - `publication_stories` (0 rows)
  - `api_logs` (0 rows)

## Configuration

### Environment Variables (backend/.env)
```env
DATABASE_URL=postgresql://user:pass@host.neon.tech/dbname?sslmode=require
GEMINI_API_KEY=your_gemini_api_key_here
LOG_LEVEL=INFO
LOG_FORMAT=json
```
*Note: Actual credentials are stored in `.env` (not committed to git)*

## How to Use

### Activate Virtual Environment

**Windows PowerShell:**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
```

**Windows Git Bash:**
```bash
cd backend
source venv/Scripts/activate
```

**Windows CMD:**
```cmd
cd backend
venv\Scripts\activate.bat
```

### Run Scripts

**PowerShell / Git Bash / CMD (same for all):**
```bash
# Initialize database (already done)
python scripts/init_db.py

# Check database health
python -c "from src.core.database import check_database_health; print(check_database_health())"

# Test ingestion
python scripts/test_ingestion.py

# Test editorial
python scripts/test_editorial.py
```

### Install Additional Dependencies
```bash
pip install <package-name>
```

### Deactivate Virtual Environment
```bash
deactivate
```

## Project Structure

```
app-newsbridge/
├── backend/
│   ├── venv/              # Virtual environment ✅
│   ├── .env               # Environment config ✅
│   ├── pyproject.toml     # Dependencies
│   ├── data/
│   │   └── schema.sql     # Database schema
│   ├── scripts/           # Utility scripts
│   ├── src/               # Source code
│   │   ├── core/          # Config, database, logging
│   │   ├── ingestion/     # RSS collection
│   │   ├── editorial/     # Content processing
│   │   ├── translation/   # Translation engine
│   │   └── storage/       # Data repositories
│   └── tests/             # Test suite
├── frontend/              # Web application
├── CLAUDE.md              # Project instructions
└── NEON_SETUP.md          # Database setup guide

## Next Steps

### 1. Test the ingestion pipeline

**PowerShell:**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python scripts/test_ingestion.py
```

**Git Bash:**
```bash
cd backend
source venv/Scripts/activate
python scripts/test_ingestion.py
```

### 2. Test editorial processing
```bash
python scripts/test_editorial.py
```

### 3. Run tests
```bash
pytest
```

### 4. Type checking
```bash
mypy src/
```

### 5. Linting
```bash
ruff check src/
```

## Troubleshooting

### PowerShell Execution Policy Error
If you see `Activate.ps1 cannot be loaded because running scripts is disabled`:

**Option 1 - Temporary (Recommended):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.\venv\Scripts\Activate.ps1
```

**Option 2 - Permanent (Admin required):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Option 3 - Use Git Bash instead:**
```bash
source venv/Scripts/activate
```

### Database Connection Issues
If you see connection errors:
1. Check `backend/.env` has correct `DATABASE_URL`
2. Verify Neon project is active in dashboard
3. Check network/firewall settings

### Import Errors
If Python can't find modules:

**PowerShell:**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
pip install -e .
```

**Git Bash:**
```bash
cd backend
source venv/Scripts/activate
pip install -e .
```

### Schema Errors
To reset database:
```bash
python scripts/cleanup_database.py
python scripts/init_db.py
```

## Resources

- [NEON_SETUP.md](backend/NEON_SETUP.md) - Detailed Neon setup guide
- [CLAUDE.md](CLAUDE.md) - Project coding guidelines
- [pyproject.toml](backend/pyproject.toml) - Dependency specifications

## Quick Start Cheat Sheet

### PowerShell Quick Start
```powershell
# Navigate to backend
cd C:\Users\TPRADHA\OneDrive` - Daimler` Truck\Workspace\Documents\Docs\Personal\PetProject\app-newsbridge\backend

# Activate virtual environment (if execution policy error, see Troubleshooting)
.\venv\Scripts\Activate.ps1

# Verify setup
python scripts\init_db.py

# Run first test
python scripts\test_ingestion.py

# Deactivate when done
deactivate
```

### Git Bash Quick Start
```bash
# Navigate to backend
cd "/c/Users/TPRADHA/OneDrive - Daimler Truck/Workspace/Documents/Docs/Personal/PetProject/app-newsbridge/backend"

# Activate virtual environment
source venv/Scripts/activate

# Verify setup
python scripts/init_db.py

# Run first test
python scripts/test_ingestion.py

# Deactivate when done
deactivate
```

---

**Setup Date**: 2026-07-10  
**Python**: 3.12.10  
**Database**: Neon Postgres (eu-central-1)  
**Platform**: Windows 11 Enterprise  
**Shells Supported**: PowerShell, Git Bash, CMD  
**Status**: ✅ Ready for development

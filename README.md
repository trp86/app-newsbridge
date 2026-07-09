# Global Knowledge Brief

Deliver global knowledge in regional languages.

## Mission

Bridge the gap for millions who can access local news in their language but cannot easily access global knowledge. Transform world news into meaningful, understandable briefs in regional languages.

## Tech Stack

- Python 3.12
- uv (package manager)
- pydantic (data validation)
- feedparser (RSS parsing)
- OpenRouter (AI models)
- Telegram Bot API
- SQLite (database)

## Project Structure

```
.
├── src/
│   ├── core/           # Configuration, schemas, database, logging
│   ├── ingestion/      # RSS collection, deduplication
│   ├── editorial/      # Summarization, quality filtering
│   ├── translation/    # Translation engine
│   ├── publishing/     # Telegram delivery
│   ├── storage/        # Database operations
│   └── pipeline/       # End-to-end orchestration
├── tests/              # Test suite
├── data/               # SQLite database
├── docs/               # Documentation
├── scripts/            # Utility scripts
└── skills/             # Role-based project guidance

```

## Setup

### Prerequisites

- Python 3.12+
- uv package manager
- OpenRouter API key (free tier)
- Telegram bot token

### Installation

```bash
# Clone repository
cd app-global-knowledge-brief

# Install dependencies with uv
uv pip install -e ".[dev]"

# Copy environment template
cp .env.example .env

# Edit .env with your credentials
# - OPENROUTER_API_KEY
# - TELEGRAM_BOT_TOKEN
# - TELEGRAM_CHANNEL_ID
```

### Initialize Database

```bash
python -c "from src.core import init_database; init_database()"
```

### Run Tests

```bash
pytest
```

## Phase 1 MVP

**Languages:** English + Odia  
**Platform:** Telegram  
**Frequency:** 5 stories daily  
**Cost:** $0/month (free tier models)

**Data Sources (RSS):**
- Reuters World
- BBC World
- Deutsche Welle
- AP Top News
- NASA Breaking
- Al Jazeera English

**AI Models:**
- Summarization: google/gemini-flash-1.5 (free)
- Translation: google/gemini-pro-1.5 (free)

## Development Status

**Current Phase:** Milestone 1 Complete ✅

**Completed:**
- Project structure and documentation
- Core Pydantic models (9 schemas)
- SQLite database schema (6 tables)
- Configuration management
- Structured logging
- Test suite foundation

**Next:** Milestone 2 - RSS Ingestion

See [PROJECT_STATUS.md](PROJECT_STATUS.md) for detailed status.

## Key Documents

- [CLAUDE.md](CLAUDE.md) - Project instructions
- [SOUL.md](SOUL.md) - Project philosophy
- [ROADMAP.md](ROADMAP.md) - Phase timeline
- [TODO.md](TODO.md) - Task tracking
- [DECISIONS.md](DECISIONS.md) - Architecture Decision Records
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - Current status

## Contributing

This is currently a personal project in active development.

## License

MIT
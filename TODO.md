# Milestone 1: Foundation (Week 1)
[x] Create pyproject.toml with uv
[x] Implement core schemas (9 Pydantic models)
[x] Setup SQLite database + schema
[x] Configure structured logging
[x] Environment variable management (.env.example)
[x] Write tests for core functionality
[x] Create .gitignore

# Milestone 2: Ingestion (Week 2) - German News Focus ✅
[x] Update config with 5 German sources (hybrid: 2 German + 3 English)
[x] Implement RSS collector
[x] Implement feed parser
[x] Build hash-based deduplication with DB lookup
[x] Create storage repository (CRUD operations)
[x] Write ingestion tests (22 tests passing)
[x] Test with real RSS feeds (93 articles collected)
[x] Verify 80+ articles/day collection (93 articles, 4/5 sources working)
[ ] Add content quality filter (deferred to later)
[ ] Fix Süddeutsche Zeitung source (0 articles - see docs/ISSUE_SZ_FEED.md for details)

# Milestone 3: Editorial (Week 3) - In Progress
[x] Integrate OpenRouter API wrapper (with retry logic)
[x] Implement 30/111/250 word summarization prompts
[x] Create German → English meaningful transformation prompts
[x] Create English → English summarization prompts
[x] Build quality filter (score 0.0-1.0)
[x] Build story selector (top 5 by composite score)
[x] Write unit tests (quality filter, story selector)
[x] Create integration test script (test_editorial.py)
[ ] Test with real OpenRouter API (run scripts/test_editorial.py)
[ ] Verify German articles get meaningful transformation
[ ] Verify English articles get proper summaries
[ ] Store briefs in database

# Milestone 4: Translation (Week 4)
[ ] Implement Odia translation client
[ ] Create technical term glossary
[ ] Build translation validator (length/format checks)
[ ] Test with sample briefs

# Milestone 5: Publishing (Week 5)
[ ] Setup Telegram bot with BotFather
[ ] Implement Telegram client
[ ] Build message formatter
[ ] Add retry logic with exponential backoff
[ ] Test end-to-end with test channel

# Milestone 6: Orchestration (Week 6)
[ ] Build daily pipeline orchestrator
[ ] Add error handling and alerting
[ ] Create manual trigger script
[ ] Setup daily cron job
[ ] Document operations playbook

# Milestone 7: Hardening (Week 7)
[ ] Implement comprehensive logging
[ ] Add API rate limit handling
[ ] Build health check dashboard
[ ] Write operational runbook
[ ] Conduct week-long dry run

# Future Improvements (Post-MVP)
[ ] Reorganize documentation structure
  - Keep README.md and CLAUDE.md at root
  - Move project docs to docs/project/ (SOUL, ROADMAP, TODO, STATUS, DECISIONS)
  - Organize by category: docs/adr/, docs/milestones/, docs/issues/
  - Update all cross-references
  - Decision date: 2026-07-05
[ ] Add News API integration (Phase 2)
  - Guardian API (5,000 req/day free) - primary candidate
  - NewsAPI.org (100 req/day) - optional
  - Would increase articles from ~93 to ~150/day
  - Deferred to Phase 2 - MVP uses RSS-only (ADR-005)
  - Decision date: 2026-07-05
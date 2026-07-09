# ADR-001

Decision:
Telegram before WhatsApp.

Reason:
Faster development.

Status:
Accepted

Date:
2026-07-04

# ADR-002

Decision:
English becomes source language.

Reason:
All translations derive from one master summary.

Status:
Accepted

Date:
2026-07-04

# ADR-003

Decision:
Use free-tier models with paid fallback chain.

Model Selection:
- Summarization: google/gemini-flash-1.5
- Translation: google/gemini-pro-1.5
- Fallback: anthropic/claude-haiku-4.5 (if free tier exhausted)

Reason:
Phase 1 MVP needs cost control. Free tier supports 5 stories/day comfortably.

Trade-offs:
Free models may have lower quality than Sonnet/Opus. Must monitor translation quality.

Status:
Accepted

Date:
2026-07-04

# ADR-004

Decision:
Add database persistence using SQLite initially.

Reason:
Deduplication requires checking historical articles. Audit trail needed. Caching translations saves API costs.

Schema:
6 tables: articles, briefs, translations, publications, publication_stories, api_logs

Migration Path:
Start with SQLite, optionally migrate to Neon Postgres in Phase 2+

Status:
Accepted

Date:
2026-07-04

# ADR-005

Decision:
RSS-first architecture with API fallback disabled for Phase 1.

Sources:
- Priority 1: Reuters, BBC, DW, AP (115 articles/day expected)
- Priority 2: NASA, Al Jazeera (fallback if P1 < 50)

Reason:
RSS is unlimited with no rate limits or API keys. Sufficient coverage for MVP.

Status:
Accepted

Date:
2026-07-04

# ADR-006

Decision:
Use SQLite for Phase 1 persistence.

Database Path:
data/brief.db

Schema:
6 tables with indexes

Reason:
Single-writer workload. Small data volume (~10 MB/year). Zero configuration. Easy debugging.

Migration Strategy:
Migrate to Neon Postgres only when Phase 2+ requires concurrent writes or remote access.

Status:
Accepted

Date:
2026-07-04

# ADR-007

Decision:
German news focus with hybrid language approach for Milestone 2.

Sources:
- German language: Tagesschau, Süddeutsche Zeitung (require DE→EN translation)
- English: Der Spiegel International, Deutsche Welle, Handelsblatt Global

Reason:
Represents what Germans actually read daily. Hybrid approach tests translation pipeline while maintaining English source language requirement (ADR-002).

Pipeline Impact:
Adds German→English translation step before summarization for German articles.

Status:
Accepted

Date:
2026-07-04

# ADR-008

Decision:
Keep all historical data indefinitely (no automatic deletion).

Reason:
- SQLite handles growth easily (34K articles/year = 25 MB)
- Perfect deduplication across all history
- Enables analytics and trend analysis
- Useful for debugging and user history
- Cleanup functions available if needed later (src/storage/cleanup.py)

Database Growth:
- 1 month: ~2,790 articles (~2 MB)
- 1 year: ~33,945 articles (~25 MB)
- 3 years: ~101K articles (~75 MB)

Status:
Accepted

Date:
2026-07-05
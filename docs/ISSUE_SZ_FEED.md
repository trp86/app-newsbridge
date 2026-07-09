# Issue: Süddeutsche Zeitung RSS Feed Returns 0 Articles

**Status:** 🟡 Open - Non-blocking  
**Priority:** Medium (for production), Low (for MVP)  
**Date Identified:** 2026-07-05  
**Affects:** Milestone 2 - RSS Ingestion  

---

## Problem Summary

Süddeutsche Zeitung (SZ) RSS feed returns 0 articles while other 4 sources work correctly.

**Current Configuration:**
```python
RSSSource(
    name="Süddeutsche Zeitung",
    url="https://www.sueddeutsche.de/news/rss",
    priority=1,
    expected_articles=25,
)
```

**Impact:**
- ❌ Expected: 20-25 articles/day from SZ
- ❌ Actual: 0 articles
- ✅ Other sources: 93 articles total (Tagesschau: 40, Handelsblatt: 21, Spiegel: 20, DW: 12)
- ✅ Still have 40 German articles from Tagesschau
- ✅ Pipeline works correctly with other sources

---

## Current Workaround

**System works fine without SZ:**
- 93 articles from 4 sources
- 40 German + 53 English articles
- Good balance for MVP testing
- Not blocking Milestone 3 (summarization)

---

## Diagnostic Steps to Run Later

### Step 1: Test Feed URL Directly

```bash
# Test if feed is accessible
curl -v "https://www.sueddeutsche.de/news/rss" 2>&1 | head -100

# Save full output for inspection
curl -s "https://www.sueddeutsche.de/news/rss" > sz_feed_raw.xml

# Check HTTP status and headers
curl -I "https://www.sueddeutsche.de/news/rss"
```

**Look for:**
- HTTP status (200 OK, 403 Forbidden, 404 Not Found, 301 Redirect)
- Content-Type header (should be application/rss+xml or application/xml)
- Redirect location if 301/302
- Any error messages in response body

### Step 2: Inspect Feed Structure

```bash
# Check for RSS items
grep -c "<item>" sz_feed_raw.xml

# View first article
grep -A 20 "<item>" sz_feed_raw.xml | head -30

# Check for required fields
grep "<title>" sz_feed_raw.xml | head -5
grep "<link>" sz_feed_raw.xml | head -5
grep "<pubDate>" sz_feed_raw.xml | head -5
```

**Look for:**
- Presence of `<item>` tags
- Required fields: `<title>`, `<link>`, `<pubDate>` or `<published>`
- Unusual namespaces or formats

### Step 3: Test with Python

```python
import feedparser
import httpx

url = "https://www.sueddeutsche.de/news/rss"

# Test HTTP access
print("Testing HTTP request...")
response = httpx.get(url, follow_redirects=True, timeout=30)
print(f"Status: {response.status_code}")
print(f"Content-Type: {response.headers.get('content-type')}")
print(f"Content Length: {len(response.content)} bytes")
print(f"Final URL: {response.url}")

# Save response for inspection
with open("sz_response.xml", "wb") as f:
    f.write(response.content)

# Test feedparser
print("\nTesting feedparser...")
feed = feedparser.parse(response.content)
print(f"Entries found: {len(feed.entries)}")
print(f"Feed bozo (error): {feed.bozo}")
if feed.bozo:
    print(f"Parse error: {feed.bozo_exception}")

# Show feed metadata
if feed.feed:
    print(f"Feed title: {feed.feed.get('title', 'N/A')}")
    print(f"Feed link: {feed.feed.get('link', 'N/A')}")

# Show first entry if exists
if feed.entries:
    entry = feed.entries[0]
    print(f"\nFirst entry:")
    print(f"  Title: {entry.get('title', 'N/A')}")
    print(f"  Link: {entry.get('link', 'N/A')}")
    print(f"  Published: {entry.get('published', 'N/A')}")
else:
    print("\nNo entries found!")
```

### Step 4: Check Integration Test Logs

Review logs from `python scripts/test_ingestion.py` for:

```bash
# Look for SZ-specific errors
grep -i "süddeutsche" test_output.log
grep "source.fetch_failed" test_output.log
grep "source.collected.*Süddeutsche" test_output.log
```

**Look for:**
- `source.fetch_failed` with name=Süddeutsche Zeitung
- HTTP errors (403, 404, 500, timeout)
- Parse errors
- Any exception messages

---

## Possible Root Causes

### 1. Feed URL Changed (High Probability)

**Symptoms:**
- HTTP 200 OK but empty feed
- HTTP 404 Not Found
- HTTP 301/302 redirect to different page

**How to verify:**
- Check official SZ website for RSS links
- Visit: https://www.sueddeutsche.de/service/rss-service-1.3933499
- Look for updated feed URLs

**Possible alternative URLs to try:**
```python
# Main topics feed
"https://rss.sueddeutsche.de/rss/Topthemen"

# Politics feed
"https://www.sueddeutsche.de/politik/rss"

# Economy/Business feed
"https://www.sueddeutsche.de/wirtschaft/rss"

# All news feed
"https://rss.sueddeutsche.de/alles"
```

### 2. Geo-Blocking (Medium Probability)

**Symptoms:**
- HTTP 403 Forbidden
- Different content for non-German IPs
- Works with German VPN

**How to verify:**
```bash
# Test with German User-Agent
curl -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" \
     "https://www.sueddeutsche.de/news/rss"

# Test from different locations
# Try from German server/VPN if available
```

**Fix if this is the cause:**
```python
# In src/ingestion/rss_collector.py, update fetch_feed():
def fetch_feed(url: str, timeout: int = 30) -> feedparser.FeedParserDict:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/rss+xml, application/xml, text/xml",
        "Accept-Language": "de-DE,de;q=0.9,en;q=0.8",
    }
    response = httpx.get(url, headers=headers, timeout=timeout, follow_redirects=True)
    # ... rest of function
```

### 3. Feed Format Changed (Low Probability)

**Symptoms:**
- Feed accessible but feedparser returns 0 entries
- Valid XML but non-standard structure

**How to verify:**
- Inspect raw XML structure
- Compare with working feeds
- Check for unusual namespaces

**Fix if this is the cause:**
- Custom parser for SZ format
- Or report issue to feedparser library

### 4. Authentication Required (Low Probability)

**Symptoms:**
- Redirect to login page
- Paywall message in feed

**How to verify:**
- Check if feed requires API key
- Look for subscription prompts

**Fix if this is the cause:**
- Find alternative public feed
- Or remove SZ from sources

### 5. Temporary Downtime (Very Low)

**Symptoms:**
- Connection timeout
- HTTP 5xx errors

**How to verify:**
- Retry at different time
- Check SZ status page

---

## Possible Solutions

### Solution 1: Update Feed URL

**If feed URL changed:**

```python
# Update src/core/config.py
RSSSource(
    name="Süddeutsche Zeitung",
    url="https://rss.sueddeutsche.de/rss/Topthemen",  # New URL
    priority=1,
    expected_articles=25,
),
```

### Solution 2: Add Request Headers

**If geo-blocking issue:**

```python
# Modify src/ingestion/rss_collector.py
def fetch_feed(url: str, timeout: int = 30) -> feedparser.FeedParserDict:
    """Fetch RSS feed from URL with proper headers."""
    logger.info("feed.fetch", url=url)

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/rss+xml,application/xml,text/xml,*/*",
        "Accept-Language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
    }

    response = httpx.get(
        url, 
        headers=headers,
        timeout=timeout, 
        follow_redirects=True
    )
    response.raise_for_status()

    feed = feedparser.parse(response.content)
    # ... rest of function
```

### Solution 3: Replace with Alternative German Source

**If SZ no longer provides free RSS:**

```python
# Option A: Use Tagesschau category feeds (more German content)
RSSSource(
    name="Tagesschau Inland",
    url="https://www.tagesschau.de/inland/rss2",
    priority=1,
    expected_articles=20,
),

# Option B: Use Zeit.de (German weekly newspaper)
RSSSource(
    name="Die Zeit",
    url="https://newsfeed.zeit.de/index",
    priority=1,
    expected_articles=20,
),

# Option C: Use Frankfurter Allgemeine (German quality newspaper)
RSSSource(
    name="Frankfurter Allgemeine",
    url="https://www.faz.net/rss/aktuell/",
    priority=1,
    expected_articles=25,
),
```

### Solution 4: Implement Retry with Different Headers

**If intermittent access:**

```python
# Add retry logic with different strategies
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def fetch_feed_with_retry(url: str) -> feedparser.FeedParserDict:
    # Try different User-Agents if first fails
    user_agents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        "curl/7.68.0",
    ]
    
    for ua in user_agents:
        try:
            headers = {"User-Agent": ua}
            response = httpx.get(url, headers=headers, timeout=30)
            feed = feedparser.parse(response.content)
            if len(feed.entries) > 0:
                return feed
        except Exception:
            continue
    
    return feedparser.FeedParserDict()  # Empty feed
```

---

## Testing After Fix

After implementing any solution, verify:

```bash
# 1. Run unit tests
pytest tests/test_ingestion/ -v

# 2. Test specific source
python -c "
from src.ingestion.rss_collector import fetch_feed
feed = fetch_feed('https://NEW_SZ_URL_HERE')
print(f'Entries: {len(feed.entries)}')
"

# 3. Run full integration test
python scripts/test_ingestion.py

# 4. Check database
sqlite3 data/brief.db "SELECT source_name, COUNT(*) FROM articles GROUP BY source_name;"
```

**Expected result:**
- Süddeutsche Zeitung: 20-30 articles
- Total articles: 110-120 (up from 93)

---

## When to Address This Issue

### Priority Assessment

**Do NOT address now if:**
- ✅ Other sources working (Current: 4/5 working)
- ✅ Enough articles for testing (Current: 93 articles)
- ✅ Not blocking next milestone (Milestone 3 independent)

**Address in these situations:**

**Priority 1 (High) - Address immediately:**
- Multiple sources failing (2+ sources with 0 articles)
- Total articles < 50/day
- Blocking production launch

**Priority 2 (Medium) - Address before production:**
- Preparing for Phase 1 MVP launch
- User testing feedback shows insufficient articles
- After Milestone 7 (Hardening) complete

**Priority 3 (Low) - Address when convenient:**
- During code refactoring
- When adding new sources
- If other German sources also fail

**Current Assessment:** **Priority 3 (Low)** - Address after Milestone 3-4

---

## Timeline Recommendation

```
Now (Milestone 2):
✅ Document issue (this file)
✅ Continue to Milestone 3

After Milestone 3 (Editorial):
⏸️ Optional: Quick investigation if time permits

After Milestone 4 (Translation):
⏸️ Optional: Fix if affecting translation testing

Before Production (After Milestone 7):
🎯 Must fix: Ensure all sources working

Production:
✅ Add monitoring to alert on 0 articles
✅ Implement automatic fallback sources
```

---

## Related Files

- Configuration: [src/core/config.py](../src/core/config.py) (line 56-62)
- RSS Collector: [src/ingestion/rss_collector.py](../src/ingestion/rss_collector.py)
- Integration Test: [scripts/test_ingestion.py](../scripts/test_ingestion.py)
- ADR-007: [DECISIONS.md](../DECISIONS.md) (German news source selection)

---

## Notes

- Current German article coverage: 40 articles/day from Tagesschau (sufficient for MVP)
- English article coverage: 53 articles/day from 3 sources (good)
- Total: 93 articles/day (exceeds 80+ target)
- Issue documented: 2026-07-05
- Next review: After Milestone 4 complete

---

## Contact/References

- SZ RSS Service Page: https://www.sueddeutsche.de/service/rss-service-1.3933499
- SZ API Documentation: (check if available)
- German News RSS List: https://www.rss-verzeichnis.de/rss-feeds-deutsch

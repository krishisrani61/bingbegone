# Configuration

BingBeGone is intentionally configurable because hardcoding things is how software becomes haunted.

---

# Search Engine Selection

Supported engines:

- Google
- DuckDuckGo
- Brave Search
- Startpage
- Kagi
- Custom URL

---

# Custom Search URLs

You may specify a custom search URL using:

```txt
{query}
```

Example:

```txt
https://example.com/search?q={query}
```

BingBeGone replaces `{query}` with the search terms from Bing.

---

# Redirect Modes

## Instant Redirect

Immediately redirects Bing searches.

Fast.

Aggressive.

Efficient.

Like a New York taxi driver.

---

## Redirect Page

Shows an intermediate page before redirecting.

Features:
- Cancel button
- Delay timer
- Visible destination
- Emotional closure

---

# Redirect Delay

Adjustable in milliseconds.

Recommended values:

| Delay | Experience |
|---|---|
| 0ms | Teleportation |
| 500ms | Fast |
| 1500ms | Normal |
| 5000ms | Dramatic |

---

# Sync Settings

BingBeGone can sync settings through your Chrome profile using:

```txt
chrome.storage.sync
```

This allows settings to follow you between devices.

Assuming Google feels cooperative that day.
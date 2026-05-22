# Configuration

BingBeGone supports multiple redirect modes and search engines.

---

## Supported Search Engines

- Google
- DuckDuckGo
- Brave Search
- Startpage
- Kagi
- Custom URLs

---

## Custom Search URLs

You may define your own search engine template using:

```txt
{query}
```

Example:

```txt
https://example.com/search?q={query}
```

---

## Redirect Modes

### Instant Redirect

Immediately redirects the Bing search page.

### Redirect Page

Shows a confirmation/interstitial page before redirecting.

This page includes:
- cancel button
- redirect countdown
- manual continue button

---

## Sync Settings

Settings can optionally sync through your Chrome profile using:

```txt
chrome.storage.sync
```

This allows BingBeGone preferences to follow you across signed-in browsers.

---

## Ignored Bing Parameters

BingBeGone ignores unnecessary Bing tracking parameters such as:

- FORM
- PC
- cvid
- sp
- ghc

Only the search query itself is preserved.
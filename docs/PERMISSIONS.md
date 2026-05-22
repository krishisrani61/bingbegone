# Permissions 🔐

BingBeGone intentionally requests the minimum permissions required to function.

No scary nonsense.
No “read and modify all data on all websites.”
No ancient forbidden browser rituals.

---

## storage

Used to save:
- selected search engine
- redirect preferences
- sync settings
- extension state

Optional Chrome profile syncing uses:
```txt
chrome.storage.sync
```

---

## webNavigation

Used to detect when the browser navigates to a Bing search page.

Without this permission the extension would have the observational abilities of a potato.

---

## Host Permissions

```txt
https://www.bing.com/*
https://bing.com/*
```

Required so BingBeGone can:
- detect Bing searches
- redirect Bing searches

The extension does NOT access unrelated websites.

---

## No Tracking

BingBeGone:
- does not use analytics
- does not collect telemetry
- does not sell data
- does not fingerprint users
- does not upload browsing history

Your searches stay between:
- you
- your browser
- your chosen search engine
- whatever horrifying ad ecosystem already exists there
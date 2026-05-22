# Permissions

BingBeGone requests only the permissions required for redirect functionality.

---

## storage

Used to save user preferences such as:

- selected search engine
- redirect mode
- redirect delay
- extension enabled/disabled state
- custom search engine URLs

Settings may optionally sync through the user's Chrome profile.

---

## webNavigation

Used to detect navigation to Bing search pages in order to perform redirects.

The extension only checks Bing URLs and does not inspect unrelated browsing activity.

---

## Host Permissions

```txt
https://www.bing.com/*
https://bing.com/*
```

Required so BingBeGone can detect Bing search pages and redirect them appropriately.

The extension does not access unrelated websites.
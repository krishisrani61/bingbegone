# Architecture 🏗️

This document explains how BingBeGone works internally.

Or at least how it works when Chrome is behaving itself.

---

# Overview

BingBeGone is a lightweight Manifest V3 browser extension that intercepts Bing search navigations and redirects them to a user-selected search engine.

The extension operates entirely client-side.

No backend.
No cloud infrastructure.
No Kubernetes cluster held together by fear.
No AI microservice named “Orchestrator.”

Just browser code.

---

# High-Level Flow

```txt
Windows / App / User
        ↓
 Opens Bing Search URL
        ↓
 Browser navigates to:
 bing.com/search?q=...
        ↓
 BingBeGone detects navigation
        ↓
 Extract search query
        ↓
 Build replacement URL
        ↓
 Redirect OR show redirect page
        ↓
 Open preferred search engine
```

---

# Repository Structure

```txt
extension/
├─ assets/
├─ background.js
├─ defaults.js
├─ manifest.json
│
├─ lib/
│  ├─ redirectBuilder.js
│  ├─ storage.js
│  └─ urlParser.js
│
├─ pages/
│  ├─ options.html
│  ├─ options.js
│  ├─ redirect.html
│  ├─ redirect.js
│  └─ redirect.css
│
└─ popup/
   ├─ popup.html
   ├─ popup.js
   └─ popup.css
```

---

# Core Components

## `background.js`

Main extension service worker.

Responsibilities:
- listen for Bing navigation events
- load user settings
- parse search queries
- generate redirect URLs
- update browser tabs

This is effectively the extension's brain.

Which is unfortunate because it is JavaScript.

---

## `urlParser.js`

Responsible for:
- validating Bing URLs
- extracting search queries
- preventing invalid redirects

Example:

Input:

```txt
https://www.bing.com/search?q=snakes
```

Output:

```js
{
  query: "snakes"
}
```

---

## `redirectBuilder.js`

Constructs the final redirect destination.

Example:

```txt
google:
https://www.google.com/search?q=snakes
```

Supports:
- predefined engines
- custom engines
- encoded query substitution

---

## `storage.js`

Handles settings persistence.

Uses:
- `chrome.storage.local`
- `chrome.storage.sync`

Settings include:
- selected engine
- redirect mode
- delay duration
- extension enabled state

---

## Popup UI

The popup provides:
- quick enable/disable controls
- current engine display
- shortcuts to settings

It exists because users enjoy buttons.

---

## Options Page

The options page handles:
- engine selection
- redirect timing
- custom URL templates
- sync settings

This is where power users become dangerous.

---

## Redirect Page

Optional interstitial page shown before redirecting.

Purpose:
- user visibility
- cancellation support
- delay timers

Useful for:
- debugging
- transparency
- dramatic tension

---

# Why Manifest V3?

Because Google said so.

Also:
- improved security model
- event-driven execution
- lower persistent resource usage

Also because Manifest V2 is being slowly marched into the forest.

---

# Navigation Detection

BingBeGone uses:

```js
chrome.webNavigation.onBeforeNavigate
```

This allows the extension to:
- detect Bing searches early
- intercept navigation cleanly
- avoid injecting scripts into pages

Only Bing domains are monitored.

The extension does not inspect unrelated browsing activity.

---

# Why Not declarativeNetRequest?

`declarativeNetRequest` works best for static redirects.

BingBeGone requires:
- extracting dynamic query parameters
- generating dynamic URLs
- optional redirect pages
- configurable engines

Using navigation listeners provides more flexibility with simpler logic.

Also the debugging experience is approximately 700% less painful.

---

# Security Model

BingBeGone intentionally minimizes:
- permissions
- host access
- external communication

The extension:
- does not inject arbitrary scripts
- does not communicate with servers
- does not collect analytics
- does not process unrelated websites

All processing occurs locally.

Like a civilized utility.

---

# Performance

The extension is effectively idle most of the time.

Processing only occurs when:
- navigating to Bing search URLs

Typical workload:
1. parse URL
2. build redirect
3. redirect tab

Measured resource usage:
“basically nothing”

Scientific.

---

# Browser Compatibility

Officially supported:
- Chrome
- Edge

Compatible with most Chromium browsers supporting:
- Manifest V3
- chrome.storage
- chrome.webNavigation

Including:
- Brave
- Vivaldi
- Opera
- Arc

Potentially:
- smart fridge browsers
- mysterious OEM browsers
- things humanity was not meant to run Chromium on

---

# Future Ideas

Potential future features:
- regex-based redirects
- per-domain engine rules
- import/export settings
- Firefox port
- keyboard shortcuts

Potentially NOT future features:
- AI integration
- telemetry
- cryptocurrency
- subscription plans
- “BingBeGone Ultra Pro Max”
```
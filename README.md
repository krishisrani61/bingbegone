# BingBeGone

**BingBeGone** redirects Bing search URLs to your preferred search engine.

Useful for cases where Windows opens your default browser, but still sends searches through Bing.

## Features

- Redirect Bing searches to Google, DuckDuckGo, Brave Search, Startpage, Kagi, or a custom engine
- Optional redirect page with a cancel button
- Configurable redirect delay
- Chrome profile sync using `chrome.storage.sync`
- Local-only mode using `chrome.storage.local`
- Enable/disable toggle
- No analytics
- No external server
- Manifest V3

## Example

Input:

```txt
https://www.bing.com/search?q=snakes&FORM=WSBEDG&PC=WSBREC
```

Output:

```txt
https://www.google.com/search?q=snakes
```


## Custom search URL format

Use `{query}` where the search text should go.

Examples:

```txt
https://www.google.com/search?q={query}
https://duckduckgo.com/?q={query}
https://search.brave.com/search?q={query}
```

## Privacy

BingBeGone does not collect, transmit, or sell data. Settings are stored using Chrome extension storage.

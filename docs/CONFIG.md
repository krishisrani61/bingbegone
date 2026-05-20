# BingBeGone Configuration

## Main settings

| Setting | Type | Description |
|---|---:|---|
| `enabled` | boolean | Turns redirecting on or off. |
| `targetEngine` | string | Search engine preset. |
| `customSearchUrl` | string | Custom redirect template. Must contain `{query}`. |
| `redirectMode` | string | `instant` or `redirectPage`. |
| `redirectDelayMs` | number | Delay used by the redirect page. |
| `syncSettings` | boolean | Whether to store settings using Chrome sync storage. |

## Custom URL examples

```txt
https://www.google.com/search?q={query}
https://duckduckgo.com/?q={query}
https://search.brave.com/search?q={query}
https://www.startpage.com/sp/search?query={query}
https://kagi.com/search?q={query}
```

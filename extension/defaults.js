export const DEFAULT_SETTINGS = Object.freeze({
  enabled: true,

  targetEngine: "google",
  customSearchUrl: "https://www.google.com/search?q={query}",

  redirectMode: "instant",
  // "instant" or "redirectPage"

  redirectDelayMs: 1500,

  syncSettings: true,

  preserveOriginalQueryEncoding: false,

  openRedirectPageInSameTab: true,

  showDebugLogs: false,

  allowedBingHosts: [
    "bing.com",
    "www.bing.com"
  ],

  allowedBingPaths: [
    "/search"
  ],

  queryParamName: "q",

  ignoredBingParams: [
    "FORM",
    "PC",
    "cvid",
    "sp",
    "ghc",
    "qs",
    "sk",
    "sc",
    "pq"
  ]
});

export const SEARCH_ENGINES = Object.freeze({
  google: {
    label: "Google",
    template: "https://www.google.com/search?q={query}"
  },
  duckduckgo: {
    label: "DuckDuckGo",
    template: "https://duckduckgo.com/?q={query}"
  },
  brave: {
    label: "Brave Search",
    template: "https://search.brave.com/search?q={query}"
  },
  startpage: {
    label: "Startpage",
    template: "https://www.startpage.com/sp/search?query={query}"
  },
  kagi: {
    label: "Kagi",
    template: "https://kagi.com/search?q={query}"
  },
  custom: {
    label: "Custom",
    template: ""
  }
});

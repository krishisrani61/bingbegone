import { getSettings } from "./lib/storage.js";
import { parseBingSearch } from "./lib/urlParser.js";
import { buildRedirectUrl, buildRedirectPageUrl } from "./lib/redirectBuilder.js";

const recentlyHandledTabs = new Map();

function debug(settings, ...args) {
  if (settings.showDebugLogs) {
    console.log("[BingBeGone]", ...args);
  }
}

function wasRecentlyHandled(tabId, url) {
  const last = recentlyHandledTabs.get(tabId);
  return last && last.url === url && Date.now() - last.time < 1000;
}

function markHandled(tabId, url) {
  recentlyHandledTabs.set(tabId, {
    url,
    time: Date.now()
  });
}

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return;
  if (details.tabId < 0) return;

  const settings = await getSettings();
  if (!settings.enabled) return;

  if (wasRecentlyHandled(details.tabId, details.url)) return;

  const parsed = parseBingSearch(details.url, settings);
  if (!parsed) return;

  const targetUrl = buildRedirectUrl(parsed.query, settings);
  const finalUrl =
    settings.redirectMode === "redirectPage"
      ? buildRedirectPageUrl(targetUrl, parsed.originalUrl)
      : targetUrl;

  debug(settings, "Redirecting", details.url, "to", finalUrl);

  markHandled(details.tabId, details.url);

  try {
    await chrome.tabs.update(details.tabId, {
      url: finalUrl
    });
  } catch (error) {
    console.error("[BingBeGone] Redirect failed:", error);
  }
}, {
  url: [
    { hostEquals: "www.bing.com" },
    { hostEquals: "bing.com" }
  ]
});

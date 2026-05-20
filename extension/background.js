import { getSettings } from "./lib/storage.js";
import { parseBingSearch } from "./lib/urlParser.js";
import { buildRedirectUrl } from "./lib/redirectBuilder.js";

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return;

  const settings = await getSettings();
  if (!settings.enabled) return;

  const parsed = parseBingSearch(details.url);
  if (!parsed) return;

  const targetUrl = buildRedirectUrl(parsed.query, settings);

  const finalUrl =
    settings.redirectMode === "redirectPage"
      ? chrome.runtime.getURL(
          `pages/redirect.html?target=${encodeURIComponent(targetUrl)}&original=${encodeURIComponent(details.url)}`
        )
      : targetUrl;

  await chrome.tabs.update(details.tabId, { url: finalUrl });
});
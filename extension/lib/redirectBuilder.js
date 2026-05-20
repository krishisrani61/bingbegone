import { SEARCH_ENGINES } from "../defaults.js";

export function buildRedirectUrl(query, settings) {
  const engine = SEARCH_ENGINES[settings.targetEngine] || SEARCH_ENGINES.google;

  const template =
    settings.targetEngine === "custom"
      ? settings.customSearchUrl
      : engine.template;

  if (!template || !template.includes("{query}")) {
    return SEARCH_ENGINES.google.template.replace(
      "{query}",
      encodeURIComponent(query)
    );
  }

  const finalQuery = settings.preserveOriginalQueryEncoding
    ? query
    : encodeURIComponent(query);

  return template.replaceAll("{query}", finalQuery);
}

export function buildRedirectPageUrl(targetUrl, originalUrl) {
  const params = new URLSearchParams({
    target: targetUrl,
    original: originalUrl
  });

  return chrome.runtime.getURL(`pages/redirect.html?${params.toString()}`);
}

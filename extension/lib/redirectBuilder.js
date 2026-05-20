const ENGINES = {
  google: "https://www.google.com/search?q={query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  brave: "https://search.brave.com/search?q={query}",
  startpage: "https://www.startpage.com/sp/search?query={query}",
  kagi: "https://kagi.com/search?q={query}"
};

export function buildRedirectUrl(query, settings) {
  const template =
    settings.targetEngine === "custom"
      ? settings.customSearchUrl
      : ENGINES[settings.targetEngine] || ENGINES.google;

  return template.replace("{query}", encodeURIComponent(query));
}
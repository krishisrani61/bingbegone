export function parseBingSearch(rawUrl) {
  const url = new URL(rawUrl);

  const isBing =
    url.hostname === "bing.com" ||
    url.hostname === "www.bing.com";

  if (!isBing) return null;
  if (url.pathname !== "/search") return null;

  const query = url.searchParams.get("q");
  if (!query) return null;

  return { query, url };
}
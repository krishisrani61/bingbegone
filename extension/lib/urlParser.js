export function parseBingSearch(rawUrl, settings) {
  let url;

  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  const hostname = url.hostname.toLowerCase();
  const pathname = url.pathname;

  if (!settings.allowedBingHosts.includes(hostname)) {
    return null;
  }

  if (!settings.allowedBingPaths.includes(pathname)) {
    return null;
  }

  const queryParam = settings.queryParamName || "q";
  const query = url.searchParams.get(queryParam);

  if (!query || !query.trim()) {
    return null;
  }

  return {
    query,
    originalUrl: rawUrl,
    url
  };
}

const BASE_URL = import.meta.env.BASE_URL ?? "/";

export function getAssetPath(assetPath: string) {
  let normalizedBase = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;

  // Fix for GitHub Pages when BASE_URL defaults to "/" instead of the repo name
  if (
    normalizedBase === "/" &&
    typeof window !== "undefined" &&
    window.location.hostname.includes("github.io")
  ) {
    const pathSegments = window.location.pathname.split("/");
    if (pathSegments.length > 1 && pathSegments[1] !== "") {
      normalizedBase = `/${pathSegments[1]}/`;
    }
  }

  const trimmedPath = assetPath.replace(/^\/+/, "");
  return `${normalizedBase}${encodeURI(trimmedPath)}`;
}

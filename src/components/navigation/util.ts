import { pathnameMap } from "./config";

export function getBreadcrumb(pathname: string): string {
  const match = Object.entries(pathnameMap).find(([pattern]) => {
    const regex = new RegExp("^" + pattern.replace(/:\w+/g, "[^/]+") + "$");
    return regex.test(pathname);
  });

  return match?.[1] || "Page";
}

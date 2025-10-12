import type { NavigationConfig, NavigationItem } from "./types";
import { pathnameMap } from "./config";

export function getBreadcrumb(pathname: string): string {
  const match = Object.entries(pathnameMap).find(([pattern]) => {
    const regex = new RegExp("^" + pattern.replace(/:\w+/g, "[^/]+") + "$");
    return regex.test(pathname);
  });

  return match?.[1] || "Page";
}

export function buildPathnameMap(...configs: NavigationConfig[]) {
  const map: Record<string, string> = {};

  const traverse = (item: NavigationConfig) => {
    if ("label" in item) return;

    if ("url" in item && item.url) {
      map[item.url] = item.title;
    }

    if ("items" in item && Array.isArray(item.items)) {
      for (const sub of item.items) {
        traverse(sub as NavigationItem);
      }
    }
  };

  for (const config of configs) traverse(config);

  return map;
}

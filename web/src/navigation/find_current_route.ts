import type { AppRoute } from "./app-route-types";

export function findCurrentRoute(
  routes: AppRoute[],
  pathname: string
): AppRoute | undefined {
  for (const route of routes) {
    if (route.path === pathname) return route;

    if (route.path.includes("/:")) {
      const basePath = route.path.split("/:")[0];
      if (pathname.startsWith(basePath)) return route;
    }

    if (route.children?.length) {
      const found = findCurrentRoute(route.children, pathname);
      if (found) return found;
    }
  }

  return undefined;
}

import type {
  AppRouteBase,
  AppRouteLeaf,
  AppRouteParent,
} from "./app-route-types";

function buildBase(props: AppRouteBase): AppRouteBase {
  return { ...props };
}

export function createRouteWithChildren(
  props: Omit<AppRouteParent, "route">
): AppRouteParent {
  return {
    ...buildBase(props),
    layout: props.layout,
    children: props.children,
  };
}

export function createLeafRoute<P = {}>(
  props: Omit<AppRouteLeaf<P>, "layout" | "children">
): AppRouteLeaf<P> {
  return {
    ...buildBase(props),
    route: props.route,
  };
}

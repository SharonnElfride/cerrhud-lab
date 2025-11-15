import type { Enums } from "@/lib/supabase/supabase";
import type { PermissionKey } from "@/models/UserPermissions";

type RouteType = "auth" | "public" | "protected";

export interface AppRouteBase {
  path: string;
  label: string;
  icon: React.FC<any>;
  type: RouteType;
  redirectTo?: string;
  requiredRoles?: Enums<"user_role">[];
  requiredPermissions?: PermissionKey[];
  hideNavbar?: boolean;
  hideSidebarToggle?: boolean;
}

export interface AppRouteParent extends AppRouteBase {
  layout: React.ComponentType;
  children: AppRoute2<any>[];
  route?: never;
}

export interface AppRouteLeaf<P = {}> extends AppRouteBase {
  route: React.ComponentType<P>;
  layout?: never;
  children?: never;
}

export type AppRoute2<P = {}> = AppRouteLeaf<P> | AppRouteParent;

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

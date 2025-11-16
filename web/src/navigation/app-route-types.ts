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
  children: AppRoute<any>[];
  route?: never;
}

export interface AppRouteLeaf<P = {}> extends AppRouteBase {
  route: React.ComponentType<P>;
  layout?: never;
  children?: never;
}

export type AppRoute<P = {}> = AppRouteLeaf<P> | AppRouteParent;

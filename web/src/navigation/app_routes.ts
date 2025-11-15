import type { Enums } from "@/lib/supabase/supabase";
import type { PermissionKey } from "@/models/UserPermissions";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import Dashboard from "@/pages/dashboard";
import Profile from "@/pages/profile";
import {
  LayoutDashboardIcon,
  LogInIcon,
  ShieldBanIcon,
  TriangleAlertIcon,
  UserCogIcon,
} from "lucide-react";
import type { AppRoute2 } from "./app-routes-2";
import { MedicalTestsRoute } from "./medical-tests-routes";
import { UsersRoute } from "./users-routes";

type RouteType = "auth" | "public" | "protected";

export interface AppRoute<P = {}> {
  path: string;
  label: string;
  icon: React.FC<any>;
  route?: React.ComponentType<P>;
  layout?: React.ComponentType;
  type: RouteType;
  redirectTo?: string;
  requiredRoles?: Enums<"user_role">[];
  requiredPermissions?: PermissionKey[];
  children?: AppRoute<any>[];
  hideNavbar?: boolean;
  hideSidebarToggle?: boolean;
}

export function createRouteWithChildren(
  params: Omit<AppRoute, "layout" | "children" | "route"> & {
    layout: React.ComponentType;
    children: AppRoute<any>[];
  }
): AppRoute {
  return {
    ...params,
  };
}

export function createLeafRoute<P = {}>(
  params: Omit<AppRoute<P>, "layout" | "children">
): AppRoute<P> {
  return {
    ...params,
  };
}

export const LoginRoute: AppRoute2 = {
  path: "/",
  label: "Login",
  icon: LogInIcon,
  route: Login,
  type: "auth",
  redirectTo: MedicalTestsRoute.path,
  hideNavbar: true,
};

// export const ForgotPasswordRoute: AppRoute = {
//   path: "/forgot-password",
//   label: "Forgot Password",
//   route: ForgotPassword,
//   type: "auth",
//   hideNavbar: true,
// };

export const DashboardRoute: AppRoute2 = {
  path: "/dashboard",
  label: "Dashboard",
  route: Dashboard,
  icon: LayoutDashboardIcon,
  type: "protected",
};

export const ProfileRoute: AppRoute2 = {
  path: "/profile",
  label: "Profile",
  icon: UserCogIcon,
  route: Profile,
  type: "protected",
  hideSidebarToggle: true,
};

export const UnauthorizedRoute: AppRoute2 = {
  path: "/unauthorized",
  label: "Unauthorized",
  icon: ShieldBanIcon,
  route: Unauthorized,
  type: "public",
};

export const NotFoundRoute: AppRoute2 = {
  path: "*",
  label: "Not found",
  icon: TriangleAlertIcon,
  route: NotFound,
  type: "public",
};

// export const appGlobalRoutes: AppRoute[] = [
export const appGlobalRoutes: AppRoute2[] = [
  LoginRoute,
  DashboardRoute,
  MedicalTestsRoute,
  UsersRoute,
  ProfileRoute,
  UnauthorizedRoute,
  NotFoundRoute,
];

export const allRoutes: AppRoute[] = appGlobalRoutes.concat(
  ...appGlobalRoutes.map((rte) => rte.children ?? [])
);

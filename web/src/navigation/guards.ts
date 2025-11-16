import type { Enums, Tables } from "@/lib/supabase/supabase";
import type { BasePermission } from "@/models/Permission";
import {
  FromJson,
  type PermissionKey,
  type UserPermissions,
} from "@/models/UserPermissions";
import type { AppRouteBase } from "./app-route-types";

const hasRequiredRole = (
  userRole: Enums<"user_role">,
  requiredRoles?: Enums<"user_role">[]
) => {
  return !requiredRoles || requiredRoles.includes(userRole);
};

const hasRequiredPermissions = (
  userPermissions: UserPermissions,
  requiredPermissions?: PermissionKey[]
) => {
  if (!requiredPermissions?.length) return true;

  let hasPermission = false;

  hasPermission = requiredPermissions.every((perm) => {
    let [resource, action] = perm.split(".");
    const resKey = resource as keyof UserPermissions;
    const actKey = action as keyof BasePermission;

    return userPermissions[resKey]?.[actKey];
  });

  return hasPermission;
};

function canAccessRoute(
  route: AppRouteBase,
  user?: Tables<"profiles"> | null
): boolean {
  if (!user || Object.keys(user).length === 0) return false;
  if (!route.requiredRoles && !route.requiredPermissions) return true;

  let userPermissions = FromJson(user.permissions, user.role);
  return (
    hasRequiredRole(user.role, route.requiredRoles) &&
    hasRequiredPermissions(userPermissions, route.requiredPermissions)
  );
}

export { canAccessRoute, hasRequiredPermissions, hasRequiredRole };

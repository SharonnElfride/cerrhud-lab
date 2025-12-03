import type { Enums } from "@/lib/supabase/supabase";
import { type BasePermission, type PermissionMap } from "./permission-f";
import { RolePermissions } from "./role-permissions";

type UserPermissionResource = "users" | "medical_tests";

type UserPermissions = PermissionMap<UserPermissionResource>;

type PermissionKey = `${UserPermissionResource}.${keyof BasePermission}`;

function FromJson(
  permissions: any,
  userRole: Enums<"user_role">
): UserPermissions {
  if (!permissions) {
    return RolePermissions[userRole];
  }

  return {
    users: permissions["users"]
      ? (permissions.users as BasePermission)
      : RolePermissions[userRole].users,
    medical_tests: permissions["medical_tests"]
      ? (permissions.medical_tests as BasePermission)
      : RolePermissions[userRole].medical_tests,
  };
}

export {
  FromJson,
  type PermissionKey,
  type UserPermissionResource,
  type UserPermissions,
};

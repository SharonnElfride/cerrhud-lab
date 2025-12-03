import type { Enums } from "@/lib/supabase/supabase";
import type { UserPermissions } from "./user-permissions";

export const RolePermissions: Record<
  Enums<'user_role'>,
  UserPermissions
> = {
  user: {
    users: { create: false, read: false, update: false, delete: false },
    medical_tests: { create: false, read: true, update: false, delete: false },
  },
  admin: {
    users: { create: false, read: true, update: false, delete: false },
    medical_tests: { create: true, read: true, update: true, delete: true },
  },
  super_admin: {
    users: { create: true, read: true, update: true, delete: true },
    medical_tests: { create: true, read: true, update: true, delete: true },
  },
};

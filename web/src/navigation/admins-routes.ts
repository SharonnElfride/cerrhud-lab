import AdminsLayout from "@/pages/admins";
import AddAdmin from "@/pages/admins/add-admin";
import UpdateAdmin from "@/pages/admins/update-admin";
import Admins from "@/pages/admins/list-admin";
import ViewAdmin from "@/pages/admins/view-admin";
import { AdminsData } from "@/shared/entity-data";
import { EditIcon, EyeIcon, PlusSquareIcon, UsersIcon } from "lucide-react";
import { createLeafRoute, createRouteWithChildren } from "./app-route-factory";

const USERS_ROOT_PATH = "/users";

export const AddAdminRoute = createLeafRoute({
  path: `${USERS_ROOT_PATH}/new`,
  label: AdminsData.add.title,
  icon: PlusSquareIcon,
  route: AddAdmin,
  type: "protected",
  requiredRoles: ["super_admin"],
  requiredPermissions: ["users.create"],
});

export const ViewAdminRoute = createLeafRoute({
  path: `${USERS_ROOT_PATH}/:id`,
  label: "User's Details",
  icon: EyeIcon,
  route: ViewAdmin,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
});

export const UpdateAdminRoute = createLeafRoute({
  path: `${USERS_ROOT_PATH}/edit/:id`,
  label: AdminsData.edit.title,
  icon: EditIcon,
  route: UpdateAdmin,
  type: "protected",
  requiredRoles: ["super_admin"],
  requiredPermissions: ["users.update"],
});

export const ListAdminsRoute = createLeafRoute({
  path: USERS_ROOT_PATH,
  label: AdminsData.title,
  icon: UsersIcon,
  route: Admins,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
});

export const AdminsRoute = createRouteWithChildren({
  path: USERS_ROOT_PATH,
  label: AdminsData.title,
  icon: UsersIcon,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
  children: [ListAdminsRoute, AddAdminRoute, UpdateAdminRoute, ViewAdminRoute],
  layout: AdminsLayout,
});

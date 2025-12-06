import AdminsLayout from "@/pages/admins";
import { type AddAdminProps, AddAdmin } from "@/pages/admins/add-admin";
import Admins from "@/pages/admins/list-admin";
import {
  type UpdateAdminProps,
  UpdateAdmin,
} from "@/pages/admins/update-admin";
import { type ViewAdminProps, ViewAdmin } from "@/pages/admins/view-admin";
import { AdminsData } from "@/shared/entity-data";
import { EditIcon, EyeIcon, PlusSquareIcon, UsersIcon } from "lucide-react";
import { createLeafRoute, createRouteWithChildren } from "./app-route-factory";

export const ADMINS_ROOT_PATH = "/users";

export const AddAdminRoute = createLeafRoute<AddAdminProps>({
  path: `new`,
  label: AdminsData.add.title,
  icon: PlusSquareIcon,
  route: AddAdmin,
  type: "protected",
  requiredRoles: ["super_admin"],
  requiredPermissions: ["users.create"],
});

export const ViewAdminRoute = createLeafRoute<ViewAdminProps>({
  path: `:id`,
  label: "User's Details",
  icon: EyeIcon,
  route: ViewAdmin,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
});

export const UpdateAdminRoute = createLeafRoute<UpdateAdminProps>({
  path: `edit/:id`,
  label: AdminsData.edit.title,
  icon: EditIcon,
  route: UpdateAdmin,
  type: "protected",
  requiredRoles: ["super_admin"],
  requiredPermissions: ["users.update"],
});

export const ListAdminsRoute = createLeafRoute({
  path: "",
  label: AdminsData.title,
  icon: UsersIcon,
  route: Admins,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
});

export const AdminsRoute = createRouteWithChildren({
  path: ADMINS_ROOT_PATH,
  label: AdminsData.title,
  icon: UsersIcon,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
  layout: AdminsLayout,
  children: [ListAdminsRoute, AddAdminRoute, UpdateAdminRoute, ViewAdminRoute],
});

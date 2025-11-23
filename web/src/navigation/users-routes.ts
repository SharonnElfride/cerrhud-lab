import UsersLayout from "@/pages/users";
import AddUser from "@/pages/users/AddUser";
import EditUser from "@/pages/users/EditUser";
import Users from "@/pages/users/ListUser";
import ViewUser from "@/pages/users/ViewUser";
import { AdminsData } from "@/shared/entity-data";
import { EditIcon, EyeIcon, PlusSquareIcon, UsersIcon } from "lucide-react";
import { createLeafRoute, createRouteWithChildren } from "./app-route-factory";

const USERS_ROOT_PATH = "/users";

export const AddUserRoute = createLeafRoute({
  path: `${USERS_ROOT_PATH}/new`,
  label: AdminsData.add.title,
  icon: PlusSquareIcon,
  route: AddUser,
  type: "protected",
  requiredRoles: ["super_admin"],
  requiredPermissions: ["users.create"],
});

export const ViewUserRoute = createLeafRoute({
  path: `${USERS_ROOT_PATH}/:id`,
  label: "User's Details",
  icon: EyeIcon,
  route: ViewUser,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
});

export const UpdateUserRoute = createLeafRoute({
  path: `${USERS_ROOT_PATH}/edit/:id`,
  label: AdminsData.edit.title,
  icon: EditIcon,
  route: EditUser,
  type: "protected",
  requiredRoles: ["super_admin"],
  requiredPermissions: ["users.update"],
});

export const ListUsersRoute = createLeafRoute({
  path: USERS_ROOT_PATH,
  label: AdminsData.title,
  icon: UsersIcon,
  route: Users,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
});

export const UsersRoute = createRouteWithChildren({
  path: USERS_ROOT_PATH,
  label: AdminsData.title,
  icon: UsersIcon,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
  children: [ListUsersRoute, AddUserRoute, ViewUserRoute, UpdateUserRoute],
  layout: UsersLayout,
});

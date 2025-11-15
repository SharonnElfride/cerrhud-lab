import UsersLayout from "@/pages/users";
import AddUser from "@/pages/users/AddUser";
import EditUser from "@/pages/users/EditUser";
import Users from "@/pages/users/ListUser";
import ViewUser from "@/pages/users/ViewUser";
import { EditIcon, EyeIcon, PlusSquareIcon, UsersIcon } from "lucide-react";
import { createLeafRoute, createRouteWithChildren, type AppRoute2 } from "./app-routes-2";
// import {
//   createLeafRoute,
//   createRouteWithChildren,
//   type AppRoute2,
// } from "./app_routes";

export const AddUserRoute: AppRoute2 = createLeafRoute({
  path: "/users/new",
  label: "Add a user",
  icon: PlusSquareIcon,
  route: AddUser,
  type: "protected",
  requiredRoles: ["super_admin"],
  requiredPermissions: ["users.create"],
});

export const ViewUserRoute: AppRoute2 = createLeafRoute({
  path: "/users/:id",
  label: "User's Details",
  icon: EyeIcon,
  route: ViewUser,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
});

export const UpdateUserRoute: AppRoute2 = createLeafRoute({
  path: "/users/edit/:id",
  label: "Edit User's Details",
  icon: EditIcon,
  route: EditUser,
  type: "protected",
  requiredRoles: ["super_admin"],
  requiredPermissions: ["users.update"],
});

export const ListUsersRoute: AppRoute2 = createLeafRoute({
  path: "/users",
  label: "Users",
  icon: UsersIcon,
  route: Users,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
});

export const UsersRoute: AppRoute2 = createRouteWithChildren({
  path: "/users",
  label: "Users",
  icon: UsersIcon,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
  children: [ListUsersRoute, AddUserRoute, ViewUserRoute, UpdateUserRoute],
  layout: UsersLayout,
});

import type { Enums } from "@/lib/supabase/supabase";
import type { PermissionKey } from "@/models/UserPermissions";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import Dashboard from "@/pages/dashboard";
import MedicalTests from "@/pages/medicalTests";
import {
  AddMedicalTest,
  type AddMedicalTestProps,
} from "@/pages/medicalTests/AddMedicalTest";
import {
  EditMedicalTest,
  type EditMedicalTestProps,
} from "@/pages/medicalTests/EditMedicalTest";
import {
  ViewMedicalTest,
  type ViewMedicalTestProps,
} from "@/pages/medicalTests/ViewMedicalTest";
import Profile from "@/pages/profile";
import Users from "@/pages/users";
import AddUser from "@/pages/users/AddUser";
import EditUser from "@/pages/users/EditUser";
import ViewUser from "@/pages/users/ViewUser";
import {
  EditIcon,
  EyeIcon,
  LayoutDashboardIcon,
  LogInIcon,
  MicroscopeIcon,
  PlusSquareIcon,
  ShieldBanIcon,
  TriangleAlertIcon,
  UserCogIcon,
  UsersIcon,
  type LucideProps,
} from "lucide-react";

type RouteType = "auth" | "public" | "protected";

export interface AppRoute<P = {}> {
  path: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  route: React.ComponentType<P>;
  layout?: React.ComponentType;
  type: RouteType;
  redirectTo?: string;
  requiredRoles?: Enums<"user_role">[];
  requiredPermissions?: PermissionKey[];
  children?: AppRoute<any>[];
  hideNavbar?: boolean;
  hideSidebarToggle?: boolean;
}

export const AddMedicalTestRoute: AppRoute<AddMedicalTestProps> = {
  path: "/medical-tests/new",
  label: "Add a medical test",
  icon: PlusSquareIcon,
  route: AddMedicalTest,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["medical_tests.create"],
};

export const ViewMedicalTestRoute: AppRoute<ViewMedicalTestProps> = {
  path: "/medical-tests/:id",
  label: "Medical Test Details",
  icon: EyeIcon,
  route: ViewMedicalTest,
  type: "protected",
  requiredRoles: ["user", "admin", "super_admin"],
  requiredPermissions: ["medical_tests.read"],
};

export const UpdateMedicalTestRoute: AppRoute<EditMedicalTestProps> = {
  path: "/medical-tests/edit/:id",
  label: "Edit Medical Test Details",
  icon: EditIcon,
  route: EditMedicalTest,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["medical_tests.update"],
};

export const MedicalTestsRoute: AppRoute = {
  path: "/medical-tests",
  label: "Medical Tests",
  icon: MicroscopeIcon,
  route: MedicalTests,
  type: "protected",
  requiredRoles: ["user", "admin", "super_admin"],
  requiredPermissions: ["medical_tests.read"],
  children: [AddMedicalTestRoute, ViewMedicalTestRoute, UpdateMedicalTestRoute],
};

export const AddUserRoute: AppRoute = {
  path: "/users/new",
  label: "Add a user",
  icon: PlusSquareIcon,
  route: AddUser,
  type: "protected",
  requiredRoles: ["super_admin"],
  requiredPermissions: ["users.create"],
};

export const ViewUserRoute: AppRoute = {
  path: "/users/:id",
  label: "User's Details",
  icon: EyeIcon,
  route: ViewUser,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
};

export const UpdateUserRoute: AppRoute = {
  path: "/users/edit/:id",
  label: "Edit User's Details",
  icon: EditIcon,
  route: EditUser,
  type: "protected",
  requiredRoles: ["super_admin"],
  requiredPermissions: ["users.update"],
};

export const UsersRoute: AppRoute = {
  path: "/users",
  label: "Users",
  icon: UsersIcon,
  route: Users,
  type: "protected",
  requiredRoles: ["admin", "super_admin"],
  requiredPermissions: ["users.read"],
  children: [AddUserRoute, ViewUserRoute, UpdateUserRoute],
};

export const LoginRoute: AppRoute = {
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

export const DashboardRoute: AppRoute = {
  path: "/dashboard",
  label: "Dashboard",
  route: Dashboard,
  icon: LayoutDashboardIcon,
  type: "protected",
};

export const ProfileRoute: AppRoute = {
  path: "/profile",
  label: "Profile",
  icon: UserCogIcon,
  route: Profile,
  type: "protected",
  hideSidebarToggle: true,
};

export const UnauthorizedRoute: AppRoute = {
  path: "/unauthorized",
  label: "Unauthorized",
  icon: ShieldBanIcon,
  route: Unauthorized,
  type: "public",
};

export const NotFoundRoute: AppRoute = {
  path: "*",
  label: "Not found",
  icon: TriangleAlertIcon,
  route: NotFound,
  type: "public",
};

export const appGlobalRoutes: AppRoute[] = [
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

import type { AppRoute } from "./app-route-types";
import { DashboardRoute } from "./dashboard-routes";
import { MedicalTestsRoute } from "./medical-tests-routes";
import { ProfileRoute } from "./profile-routes";
import { systemRoutes } from "./system-routes";
import { AdminsRoute } from "./admins-routes";

export const appRoutes: AppRoute[] = [
  ...systemRoutes,
  DashboardRoute,
  MedicalTestsRoute,
  AdminsRoute,
  ProfileRoute,
];

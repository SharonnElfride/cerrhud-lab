import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import { LogInIcon, ShieldBanIcon, TriangleAlertIcon } from "lucide-react";
import { createLeafRoute } from "./app-routes";
import { MedicalTestsRoute } from "./medical-tests-routes";

export const LoginRoute = createLeafRoute({
  path: "/",
  label: "Login",
  icon: LogInIcon,
  route: Login,
  type: "auth",
  redirectTo: MedicalTestsRoute.path,
  hideNavbar: true,
});

// export const ForgotPasswordRoute = createLeafRoute({
//   path: "/forgot-password",
//   label: "Forgot Password",
//   route: ForgotPassword,
//   type: "auth",
//   hideNavbar: true,
// });

export const UnauthorizedRoute = createLeafRoute({
  path: "/unauthorized",
  label: "Unauthorized",
  icon: ShieldBanIcon,
  route: Unauthorized,
  type: "public",
});

export const NotFoundRoute = createLeafRoute({
  path: "*",
  label: "Not found",
  icon: TriangleAlertIcon,
  route: NotFound,
  type: "public",
});

export const systemRoutes = [LoginRoute, UnauthorizedRoute, NotFoundRoute];

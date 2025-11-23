import Dashboard from "@/pages/dashboard";
import { LayoutDashboardIcon } from "lucide-react";
import { createLeafRoute } from "./app-route-factory";

export const DashboardRoute = createLeafRoute({
  path: "/dashboard",
  label: "Dashboard",
  route: Dashboard,
  icon: LayoutDashboardIcon,
  type: "protected",
});

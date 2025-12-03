import { useAuth } from "@/context/auth-context";
import { DashboardRoute } from "@/navigation/dashboard-routes";
import { MedicalTestsRoute } from "@/navigation/medical-tests-routes";
import { AdminsRoute } from "@/navigation/admins-routes";
import { SidebarMenu } from "../ui/sidebar";
import AppSidebarMenuItem from "./app-sidebar-menu-item";

const AppSidebarMenu = ({}) => {
  const { user } = useAuth();
  return (
    <SidebarMenu>
      <AppSidebarMenuItem route={DashboardRoute} user={user} />
      <AppSidebarMenuItem route={MedicalTestsRoute} user={user} />
      <AppSidebarMenuItem route={AdminsRoute} user={user} />
    </SidebarMenu>
  );
};

export default AppSidebarMenu;

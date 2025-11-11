import { useAuth } from "@/context/AuthContext";
import {
  DashboardRoute,
  MedicalTestsRoute,
  UsersRoute,
} from "@/navigation/app_routes";
import { SidebarMenu } from "../ui/sidebar";
import AppSidebarMenuItem from "./AppSidebarMenuItem";

const AppSidebarMenu = ({}) => {
  const { user } = useAuth();
  return (
    <SidebarMenu>
      <AppSidebarMenuItem route={DashboardRoute} user={user} />
      <AppSidebarMenuItem route={MedicalTestsRoute} user={user} />
      <AppSidebarMenuItem route={UsersRoute} user={user} />
    </SidebarMenu>
  );
};

export default AppSidebarMenu;

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { CerrhudLabData, LabLinks } from "@/shared/cerrhud-data";
import AppSidebarProfile from "../profile/app-sidebar-profile";
import AppSidebarLink from "./app-sidebar-link";
import AppSidebarMenu from "./app-sidebar-menu";
import logoIcon from "/src/assets/adaptive-icon.png";

const AppSidebarSeparator = ({}) => <hr className="border-primary/50" />;

const AppSidebar = ({}) => {
  return (
    <Sidebar
      className="bg-muted animate-in"
      variant="floating"
      collapsible="icon"
    >
      <SidebarHeader>
        <div className="flex gap-2 items-center">
          <img src={logoIcon} className="rounded-full w-8 h-8" />
          <h2 className="uppercase font-extrabold text-base text-primary group-data-[collapsible=icon]:hidden">
            {CerrhudLabData.title}
          </h2>
        </div>

        <AppSidebarSeparator />
      </SidebarHeader>

      <SidebarContent className="justify-between">
        <SidebarGroup>
          <SidebarGroupContent>
            <AppSidebarMenu />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Liens utiles</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-2">
            {LabLinks.map((item, idx) => (
              <AppSidebarLink
                key={`${item.title.toKeyCase(idx)}`}
                linkItem={item}
              />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <AppSidebarSeparator />

        <AppSidebarProfile />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

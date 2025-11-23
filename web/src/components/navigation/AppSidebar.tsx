import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { CerrhudLabData, LabLinks } from "@/shared/cerrhud_data";
import AppSidebarProfile from "../profile/AppSidebarProfile";
import AppSidebarLink from "./AppSidebarLink";
import AppSidebarMenu from "./AppSidebarMenu";
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

import type { AppRouteBase } from "@/navigation/app-route-types";
import { canAccessRoute } from "@/navigation/guards";
import type { AuthProps } from "@/shared/auth-props";
import { cva } from "class-variance-authority";
import { Link, useLocation } from "react-router-dom";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

const customNavigationMenuLinkStyle = cva(
  "flex-row items-center gap-2 px-3 py-2 rounded-md transition-colors duration-150 active:bg-primary active:text-primary-foreground active:[&_svg:not([class*='text-'])]:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:[&_svg:not([class*='text-'])]:text-primary-foreground",
  {
    variants: {
      active: {
        true: "bg-primary text-primary-foreground [&_svg:not([class*='text-'])]:text-primary-foreground hover:bg-primary hover:text-primary-foreground hover:[&_svg:not([class*='text-'])]:text-primary-foreground",
        false:
          "text-primary/70 hover:bg-primary/10 hover:text-primary [&_svg:not([class*='text-'])]:text-primary/70 hover:[&_svg:not([class*='text-'])]:text-primary",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

const AppSidebarMenuItem = ({
  route,
  user,
}: AuthProps & {
  route: AppRouteBase;
}) => {
  const { pathname } = useLocation();
  const isActive =
    pathname === route.path ||
    (route.path.includes("/:") &&
      pathname.startsWith(route.path.split("/:")[0]));

  return canAccessRoute(route, user) ? (
    <SidebarMenuItem key={route.label}>
      <SidebarMenuButton
        asChild
        className={customNavigationMenuLinkStyle({ active: isActive })}
      >
        <Link
          to={route.path}
          className="items-center gap-2"
          autoCapitalize="words"
        >
          {route.icon && <route.icon size={18} />}
          {route.label}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ) : null;
};

export default AppSidebarMenuItem;

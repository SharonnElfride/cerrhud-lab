import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { ProfileRoute } from "@/navigation/app_routes";
import { ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Spinner } from "../ui/spinner";

const AppSidebarProfile = ({}) => {
  const { user, loading, logout } = useAuth();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size={"lg"}
              className={cn(
                "bg-primary/50 shadow-2xs hover:bg-primary/70 focus:bg-primary/70",
                "group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:hover:bg-transparent",
                "group-data-[collapsible=icon]:focus:bg-transparent"
              )}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={user?.avatar ?? ""}
                  alt={`Avatar de l'utilisateur ${user?.first_name ?? ""}`}
                />
                <AvatarFallback
                  style={{
                    backgroundColor:
                      user?.profile_color ?? "var(--color-primary)",
                    color: "white",
                    fontWeight: 500,
                  }}
                >
                  {loading ? <Spinner /> : user?.first_name.charAt(0) ?? "X"}
                </AvatarFallback>
              </Avatar>

              <div className="group-data-[collapsible=icon]:hidden">
                <p className="capitalize text-sm text-white w-fit">
                  {user?.first_name}
                </p>
                <p className="lowercase text-gray-50 text-[10px] w-fit">
                  {user?.email}
                </p>
              </div>

              <ChevronUp className="ml-auto text-white" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem asChild>
              <Link to={ProfileRoute.path}>
                <span>Mon profil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <span className="hover:cursor-pointer" onClick={logout}>
                Se déconnecter
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AppSidebarProfile;

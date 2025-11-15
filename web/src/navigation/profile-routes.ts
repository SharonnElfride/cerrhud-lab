import Profile from "@/pages/profile";
import { UserCogIcon } from "lucide-react";
import { createLeafRoute } from "./app-routes";

export const ProfileRoute = createLeafRoute({
  path: "/profile",
  label: "Profile",
  icon: UserCogIcon,
  route: Profile,
  type: "protected",
  hideSidebarToggle: true,
});

import ProfileAvatar from "@/components/profile/profile-avatar";
import ProfileForm from "@/components/profile/profile-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { displayUserRole } from "@/helpers/admin-role-helper";
import { useIsMobile } from "@/hooks/use-mobile";
import { DashboardRoute } from "@/navigation/dashboard-routes";
import { BadgeCheckIcon, LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, loading, logout } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col w-full p-5">
      <div
        className="absolute left-0 top-0 w-full h-40 object-cover"
        style={{
          backgroundColor: user?.profile_color ?? "var(--color-primary)",
        }}
      ></div>

      <div className="relative w-full h-40">
        <div className="absolute top-0 left-[10%] translate-y-1/2">
          <ProfileAvatar user={user} loading={loading} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 max-md:mt-20 max-md:justify-center">
        {user?.role && (
          <Badge variant="primary-outline">{displayUserRole(user?.role)}</Badge>
        )}

        <Badge variant="secondary" className="bg-accent text-accent-foreground">
          <BadgeCheckIcon />
          Vérifié
        </Badge>

        <Separator
          orientation="vertical"
          decorative
          style={{
            height: "30px",
            backgroundColor: "var(--color-primary)",
          }}
        />

        {isMobile && (
          <Button
            size="sm"
            onClick={() => {
              navigate(DashboardRoute.path, {
                replace: true,
              });
            }}
          >
            {DashboardRoute.icon && <DashboardRoute.icon />} Tableau de bord
          </Button>
        )}

        <Button size="sm" onClick={logout}>
          <LogOutIcon /> Se déconnecter
        </Button>
      </div>

      <div className="mt-5">
        <p>
          <span className="font-bold text-lg">{user?.firstname}</span>{" "}
          {user?.surname}
        </p>
        <p className="text-gray-500 text-[10px]">{user?.email}</p>
      </div>

      <div className="mt-10">
        <ProfileForm user={user} loading={loading} logout={logout} />
      </div>
    </div>
  );
};

export default Profile;

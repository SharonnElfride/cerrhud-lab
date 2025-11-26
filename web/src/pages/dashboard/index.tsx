import EntityCard from "@/components/dashboard/EntityCard";
import PageHeadline from "@/components/shared/PageHeadline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import { displayUserRole } from "@/helpers/user_role_helper";
import { canAccessRoute, hasRequiredPermissions } from "@/navigation/guards";
import { ProfileRoute } from "@/navigation/profile-routes";
import { UsersRoute } from "@/navigation/users-routes";
import { getUserLastConnectionById } from "@/services/SupabaseService";
import { UserCogIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({}) => {
  const { user, loading, userPermissions } = useAuth();
  const navigate = useNavigate();

  const [lastSignedIn, setLastSignedIn] = useState<string>();

  useEffect(() => {
    async function getLastSignedIn() {
      const lsiDate = await getUserLastConnectionById();
      setLastSignedIn(lsiDate);
    }

    getLastSignedIn();
  }, []);

  return (
    <div className="p-5 space-y-5">
      <PageHeadline
        title="Tableau de bord"
        description="Vue d'ensemble des statistiques et activités récentes de Cerrhud Lab."
        variant={"list"}
      />

      <Item variant="outline" className="md:w-1/2">
        <ItemMedia>
          <Avatar className="size-10">
            <AvatarImage src={user?.avatar ?? undefined} alt="avatar" />
            <AvatarFallback
              style={{
                backgroundColor: user?.profile_color ?? "var(--color-primary)",
                color: "white",
                fontWeight: 500,
              }}
            >
              {loading ? <Spinner /> : user?.first_name?.charAt(0) ?? "X"}
            </AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            {user?.first_name} {user?.surname}
          </ItemTitle>
          <ItemDescription>
            Rôle : {displayUserRole(user?.role ?? "user")} <br />
            Dernière connexion : {lastSignedIn}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            size="icon-sm"
            variant="outline"
            className="rounded-full"
            onClick={() => {
              navigate(ProfileRoute.path);
            }}
          >
            <UserCogIcon />
          </Button>
        </ItemActions>
      </Item>

      <div className="w-full flex flex-col md:flex-row gap-2">
        <EntityCard
          entityType="medical_tests"
          canAdd={hasRequiredPermissions(userPermissions, [
            "medical_tests.create",
          ])}
        />
        {canAccessRoute(UsersRoute, user) && (
          <EntityCard
            entityType="users"
            canAdd={hasRequiredPermissions(userPermissions, ["users.create"])}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

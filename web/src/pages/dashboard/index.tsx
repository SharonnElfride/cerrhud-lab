import EntityCard from "@/components/dashboard/EntityCard";
import ListTitle from "@/components/shared/ListTitle";
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
import { ProfileRoute, UsersRoute } from "@/navigation/app_routes";
import { canAccessRoute } from "@/navigation/guards";
import { getUserLastConnectionById } from "@/services/SupabaseService";
import { UserCogIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({}) => {
  const { user, loading } = useAuth();
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
      <ListTitle
        title="Tableau de bord"
        description="Vue d'ensemble des statistiques et activités récentes du système."
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
          {/* Date / Time lapse */}
          <ItemDescription>Dernière connexion : {lastSignedIn}</ItemDescription>
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

      <div className="w-full grid md:grid-cols-2 gap-2">
        <EntityCard entityType="medical_tests" />
        {canAccessRoute(UsersRoute, user) && <EntityCard entityType="users" />}
      </div>
    </div>
  );
};

export default Dashboard;

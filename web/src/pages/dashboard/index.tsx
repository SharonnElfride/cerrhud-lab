import ListTitle from "@/components/shared/ListTitle";
import { useAuth } from "@/context/AuthContext";

const Dashboard = ({}) => {
  const { user, logout } = useAuth();

  return (
    <div className="p-5 space-y-5">
      <ListTitle
        title="Tableau de bord"
        description="Vue d'ensemble des statistiques et activités récentes du système."
      />
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {user?.first_name + " - " + user?.email}
      </h1>
      <p className="text-muted-foreground mb-6">
        ID: {user?.id} | Role: {user?.role}
      </p>
    </div>
  );
};

export default Dashboard;

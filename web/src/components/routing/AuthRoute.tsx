import { useAuth } from "@/context/AuthContext";
import { LoginRoute } from "@/navigation/system-routes";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const AuthRoute = ({
  children,
  redirectTo = LoginRoute.path,
}: AuthRouteProps) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;

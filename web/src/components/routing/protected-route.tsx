import { useAuth } from "@/context/auth-context";
import type { AppRouteBase } from "@/navigation/app-route-types";
import { canAccessRoute } from "@/navigation/guards";
import { LoginRoute, UnauthorizedRoute } from "@/navigation/system-routes";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  route: AppRouteBase;
}

const ProtectedRoute = ({ children, route }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (!user) {
    return (
      <Navigate
        to={LoginRoute.path}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (!canAccessRoute(route, user)) {
    return <Navigate to={UnauthorizedRoute.path} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

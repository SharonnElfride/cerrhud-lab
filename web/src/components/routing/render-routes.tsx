import type { AppRoute } from "@/navigation/app-route-types";
import type { JSX } from "react";
import { Route } from "react-router-dom";
import AuthRoute from "./auth-route";
import ParentRouteLayoutTemplate from "./parent-route-layout-template";
import ProtectedRoute from "./protected-route";

function RenderRoutes(routes: AppRoute[]): React.ReactNode {
  return routes.map((rte) => {
    const routeKey = rte.path.substring(1).replace("/:", "-").replace("/", "-");
    let Element: JSX.Element = <></>;

    if (rte.layout || rte.children || !rte.route) {
      Element = rte.layout ? <rte.layout /> : <ParentRouteLayoutTemplate />;
    } else {
      Element = <rte.route />;
    }

    const element =
      rte.type === "auth" ? (
        <AuthRoute redirectTo={rte.redirectTo}>{Element}</AuthRoute>
      ) : rte.type === "protected" ? (
        <ProtectedRoute route={rte}>{Element}</ProtectedRoute>
      ) : (
        <div className="p-5">{Element}</div>
      );

    return (
      <Route key={routeKey} path={rte.path} element={element}>
        {rte.children && RenderRoutes(rte.children)}
      </Route>
    );
  });
}

export default RenderRoutes;

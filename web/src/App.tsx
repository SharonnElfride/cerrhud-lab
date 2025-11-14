import { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import "./App.css";
import AppSidebar from "./components/navigation/AppSidebar";
import AppSidebarTrigger from "./components/navigation/AppSidebarTrigger";
import RenderRoutes from "./components/routing/RenderRoutes";
import { SidebarProvider } from "./components/ui/sidebar";
import { Toaster } from "./components/ui/sonner";
import { appGlobalRoutes } from "./navigation/app_routes";
import { findCurrentRoute } from "./navigation/find_current_route";

function App() {
  const { pathname } = useLocation();
  const [hideNavbar, setHideNavbar] = useState(false);
  const [hideSidebarToggle, setHideSidebarToggle] = useState(false);

  useEffect(() => {
    let currentRoute = findCurrentRoute(appGlobalRoutes, pathname);
    setHideNavbar(currentRoute?.hideNavbar ?? false);
    setHideSidebarToggle(currentRoute?.hideSidebarToggle ?? false);
  }, [pathname]);

  return (
    <SidebarProvider>
      {!hideNavbar && <AppSidebar />}
      <main className="bg-routes-bg flex-1 min-w-4/5">
        {!hideNavbar && !hideSidebarToggle && (
          <AppSidebarTrigger className="mx-5 mt-2 font-normal hover:font-medium" />
        )}
        <Routes>{RenderRoutes(appGlobalRoutes)}</Routes>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}

export default App;

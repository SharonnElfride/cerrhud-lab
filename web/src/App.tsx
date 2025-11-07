import { useEffect, useState } from "react";
import { Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navigation/Navbar";
import RenderRoutes from "./components/routing/RenderRoutes";
import { Toaster } from "./components/ui/sonner";
import { appRoutes } from "./navigation/app_routes";
import { findCurrentRoute } from "./navigation/find_current_route";

function App() {
  const { pathname } = useLocation();
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    let currentRoute = findCurrentRoute(appRoutes, pathname);
    setHideNavbar(currentRoute?.hideNavbar ?? false);
  }, [pathname]);

  return (
    <div
      className={`flex h-screen overflow-hidden bg-muted animate-in gap-2 ${
        hideNavbar ? "" : "p-2"
      }`}
    >
      {!hideNavbar && <Navbar />}
      <main className="flex-1 min-w-4/5 overflow-y-auto bg-routes-bg shadow rounded-md scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]">
        <Routes>{RenderRoutes(appRoutes)}</Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;

import "@/utils/string.extensions";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import ScrollToTop from "./components/navigation/ScrollToTop.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        {/* <ThemeProvider> */}
        <App />
        {/* </ThemeProvider> */}
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

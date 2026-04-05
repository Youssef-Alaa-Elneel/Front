import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import LeftSidebar from "./components/layout/LeftSidebar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LeftSidebar />
      <App />
    </BrowserRouter>
  </StrictMode>,
);

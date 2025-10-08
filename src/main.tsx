import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Providers from "./Providers.tsx";
import Router from "./Router.tsx";

import "./index.css";
import "./custom.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <Router />
    </Providers>
  </StrictMode>
);

import * as React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { StyledEngineProvider } from "@mui/material/styles";

import App from "./App";

createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>,
);

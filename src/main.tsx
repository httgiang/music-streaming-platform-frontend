import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeContext } from "@emotion/react";
import theme from "@/theme/theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContext value={theme}>
      <App />
    </ThemeContext>
  </StrictMode>,
);

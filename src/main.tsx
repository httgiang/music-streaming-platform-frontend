import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ToastProvider from "@/contexts/ToastContext.tsx";
import AuthProvider from "@/contexts/AuthContext.tsx";
import theme from "@/theme/theme.ts";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "@/store";

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/service-worker.js", { scope: "/" });
//   });
// }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);

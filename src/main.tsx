import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "@/contexts/ToastContext.tsx";
import AuthProvider from "@/contexts/AuthContext.tsx";
import theme from "@/theme/theme.ts";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "@/store";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  </Provider>,
  // </StrictMode>,
);

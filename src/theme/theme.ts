import { createTheme } from "@mui/material";

declare module "@mui/material" {
  interface Theme {
    custom: {
      sideBarWidth: number;
      navBarHeight: number;
      gradient: string;
      paperOverlay: React.CSSProperties;
    };
  }
  interface ThemeOptions {
    custom?: {
      sideBarWidth?: number;
      navBarHeight?: number;
      gradient?: string;
      paperOverlay?: React.CSSProperties;
    };
  }
}
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FFFFFF" },
    background: {
      default: "#000000",
    },
    text: {
      primary: "#FFFFFF",
    },
    secondary: {
      main: "rgb(218, 150, 231)",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  custom: {
    sideBarWidth: 250,
    navBarHeight: 8,
    gradient:
      "linear-gradient(185deg,rgba(232, 69, 253, 0.81),rgba(241, 231, 84, 0.8))",
    paperOverlay: {
      backgroundColor: "#121212",
      WebkitBackdropFilter: "blur(12px)",
      zIndex: 1,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "20px",
          color: "inherit",
        },
      },
    },
  },
});

export default theme;

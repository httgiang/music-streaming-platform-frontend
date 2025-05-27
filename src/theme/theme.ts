import { createTheme } from "@mui/material";

declare module "@mui/material" {
  interface Theme {
    custom: {
      sideBarWidth: number;
      navBarHeight: number;
      gradient: string;
      lightGradient: string;
      hoverGradient: string;
      logoColor: string;
      paperOverlay: React.CSSProperties;
    };
  }
  interface ThemeOptions {
    custom?: {
      sideBarWidth?: number;
      navBarHeight?: number;
      gradient?: string;
      lightGradient?: string;
      hoverGradient?: string;
      logoColor?: string;
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
      main: "#A78BFA",
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
    lightGradient: "linear-gradient(45deg, #B39DDB 30%, #A78BFA 90%)",
    hoverGradient: "linear-gradient(45deg, #A78BFA 30%, #9575CD 90%)",
    logoColor: "linear-gradient(45deg, #B39DDB 30%, #FFD54F 90%)",
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

import { createTheme } from "@mui/material";

declare module "@mui/material" {
  interface Theme {
    custom: {
      sideBarWidth: number;
      navBarHeight: number;
    };
  }
  interface ThemeOptions {
    custom?: {
      sideBarWidth?: number;
      navBarHeight?: number;
    };
  }
}
const theme = createTheme({
  custom: {
    sideBarWidth: 38,
    navBarHeight: 8,
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
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          alignSelf: "center",
          fontSize: 18,
          color: "inherit",
        },
      },
    },
  },
});

export default theme;

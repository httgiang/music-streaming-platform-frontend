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
  palette: {
    secondary: {
      main: "rgb(232, 155, 231)",
    },
  },
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
  },
});

export default theme;

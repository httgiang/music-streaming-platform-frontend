import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "5px",
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

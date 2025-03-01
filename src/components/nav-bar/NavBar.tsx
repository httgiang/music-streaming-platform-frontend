import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      color="transparent"
      sx={{
        position: "fixed",
        boxShadow:
          "0px 2px 3px rgba(0, 0, 0, 0.1), 0px 1px 5px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Toolbar disableGutters>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            paddingX: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <img width={20} height={20} alt="GroovityLogo" />
              <Typography variant="h6" fontWeight={700}>
                Groovity
              </Typography>
            </Box>
            <SearchBar />
          </Box>
          <Box display="flex" flexDirection="row" gap={1}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate("/sign-up");
              }}
            >
              <Typography>Sign up</Typography>
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate("/log-in");
              }}
            >
              <Typography>Log in</Typography>
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

import {
  Avatar,
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Notifications } from "@mui/icons-material";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
          {!isAuthenticated ? (
            <Box display="flex" flexDirection="row" gap={2}>
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
          ) : (
            <Box display="flex" flexDirection="row" gap={3} alignItems="center">
              <Notifications sx={{ cursor: "pointer" }} />
              <IconButton onClick={handleClickMenu}>
                <Avatar sx={{ width: 22, height: 22, cursor: "pointer" }} />
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>Account</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

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
import { useAuth } from "@/contexts/AuthContext";
import theme from "@/theme/theme";
import GroovityLogo from "@/assets/groovity-logo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const logOut = useAuth().logOut;

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
      sx={{
        position: "fixed",
        top: 0,
        boxShadow:
          "0px 2px 3px rgba(0, 0, 0, 0.1), 0px 1px 5px rgba(0, 0, 0, 0.08)",
        zIndex: 1201,
        backgroundColor: theme.palette.background.default,
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
              <img
                width={28}
                height={28}
                alt="GroovityLogo"
                src={GroovityLogo}
                style={{
                  filter:
                    "drop-shadow(0 0 4px rgba(200, 120, 255, 0.5)) blur(0.2px)",
                  opacity: 0.85,
                  transition: "all 0.3s ease-in-out",
                }}
              />
              <Typography
                fontWeight="800"
                fontFamily="AMORIA"
                fontSize={30}
                letterSpacing={2}
                sx={{
                  background:
                    "linear-gradient(180deg, #d14eff 0%, #ffe600 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow:
                    "0 0 10px rgba(255, 230, 0, 0.6), 0 0 20px rgba(186, 57, 255, 0.4)",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                GROOVITY
              </Typography>
            </Box>
            <SearchBar />
          </Box>

          {!isAuthenticated ? (
            <Box display="flex" gap={2}>
              <Button
                sx={{
                  border: "solid 1px white",
                  paddingX: 1,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/sign-up");
                }}
              >
                <Typography>Sign up</Typography>
              </Button>
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  paddingX: 1,
                }}
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
              <Box>
                <Button
                  sx={{
                    background: theme.custom.gradient,
                    paddingX: 2,
                    borderRadius: 2,
                    fontWeight: 700,
                  }}
                  onClick={() => {
                    navigate("/music-workspace");
                  }}
                >
                  Music workspace
                </Button>
              </Box>
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
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    navigate("/account");
                  }}
                >
                  Account
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    navigate("/profile");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    logOut();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

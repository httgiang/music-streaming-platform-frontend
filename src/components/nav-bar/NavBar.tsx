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
  Divider,
  alpha,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Notifications } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import theme from "@/theme/theme";
import GroovityLogo from "@/assets/images/logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { motion } from "framer-motion";

const NavBar = () => {
  const navigate = useNavigate();
  const logOut = useAuth().logOut;
  const menuRef = useRef(null);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const user = useSelector((state: RootState) => state.auth.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <AppBar
      elevation={0}
      sx={{
        position: "fixed",
        top: 0,
        backdropFilter: "blur(8px)",
        backgroundColor: alpha(theme.palette.background.default, 0.85),
        borderBottom: "1px solid",
        borderColor: alpha("#B39DDB", 0.15),
        zIndex: 1201,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: 64,
          px: { xs: 1, sm: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 1, sm: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 2, sm: 4 },
            }}
          >
            <Box
              component={motion.div}
              whileHover={{ scale: 1.03 }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                pr: 1.5,
              }}
              onClick={() => navigate("/")}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, #B39DDB 20%, #9C27B0 80%)",
                  borderRadius: "50%",
                  p: 0.8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 10px rgba(156, 39, 176, 0.2)",
                }}
              >
                <img
                  src={GroovityLogo}
                  alt="Groovity Logo"
                  width={25}
                  height={25}
                />
              </Box>

              <Typography
                fontWeight="700"
                fontFamily="AMORIA"
                fontSize={{ xs: 22, sm: 28 }}
                letterSpacing={1.2}
                sx={{
                  background: theme.custom.logoColor,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 2px 10px rgba(179, 157, 219, 0.3)",
                }}
              >
                GROOVITY
              </Typography>
            </Box>

            <SearchBar />
          </Box>
          {!isAuthenticated ? (
            <Box display="flex" gap={1.5} alignItems="center">
              <Button
                variant="outlined"
                sx={{
                  borderColor: alpha("#B39DDB", 0.6),
                  color: "#B39DDB",
                  px: { xs: 1.5, sm: 2 },
                  py: 0.8,
                  borderRadius: 6,
                  textTransform: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  "&:hover": {
                    borderColor: "#B39DDB",
                    backgroundColor: alpha("#B39DDB", 0.04),
                  },
                  transition: "all 0.2s ease",
                }}
                onClick={() => navigate("/sign-up")}
              >
                Sign up
              </Button>

              <Button
                variant="contained"
                sx={{
                  background: theme.custom.lightGradient,
                  color: "#000",
                  px: { xs: 1.5, sm: 2 },
                  py: 0.8,
                  borderRadius: 6,
                  textTransform: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  boxShadow: "0 4px 10px rgba(179, 157, 219, 0.3)",
                  "&:hover": {
                    background: theme.custom.hoverGradient,
                    boxShadow: "0 6px 15px rgba(179, 157, 219, 0.4)",
                  },
                  transition: "all 0.2s ease",
                }}
                onClick={() => navigate("/log-in")}
              >
                Log in
              </Button>
            </Box>
          ) : (
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                startIcon={<EqualizerIcon />}
                sx={{
                  background: theme.custom.lightGradient,
                  color: "#000",
                  px: { xs: 1.5, sm: 2 },
                  py: 0.7,
                  borderRadius: 6,
                  textTransform: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  boxShadow: "0 4px 10px rgba(179, 157, 219, 0.3)",
                  "&:hover": {
                    background: theme.custom.hoverGradient,
                    boxShadow: "0 6px 15px rgba(179, 157, 219, 0.4)",
                  },
                  display: { xs: "none", sm: "flex" },
                }}
                onClick={() => navigate("/music-workspace")}
              >
                Studio
              </Button>

              <IconButton
                aria-label="notifications"
                sx={{
                  color: alpha("#fff", 0.7),
                  "&:hover": { color: "#B39DDB" },
                }}
              >
                <Badge badgeContent={3} color="error" variant="dot">
                  <Notifications />
                </Badge>
              </IconButton>

              <IconButton
                onClick={handleClickMenu}
                sx={{
                  p: 0.5,
                  border: `2px solid ${alpha("#B39DDB", 0.3)}`,
                  "&:hover": {
                    border: `2px solid ${alpha("#B39DDB", 0.8)}`,
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: alpha("#B39DDB", 0.2),
                    color: "#B39DDB",
                  }}
                />
              </IconButton>

              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                ref={menuRef}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    mt: 1.5,
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                    bgcolor: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: "blur(10px)",
                    border: "1px solid",
                    borderColor: alpha("#B39DDB", 0.1),
                    borderRadius: 2,
                    minWidth: 180,
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: alpha(theme.palette.background.paper, 0.9),
                      transform: "translateY(-50%) rotate(45deg)",
                      borderTop: `1px solid ${alpha("#B39DDB", 0.1)}`,
                      borderLeft: `1px solid ${alpha("#B39DDB", 0.1)}`,
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    navigate("/account");
                  }}
                  sx={{
                    py: 1.2,
                    "&:hover": { bgcolor: alpha("#B39DDB", 0.1) },
                  }}
                >
                  <ManageAccountsOutlinedIcon
                    sx={{ mr: 1.5, color: "#B39DDB" }}
                  />
                  <Typography fontSize={14}>Account Settings</Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    if (user?.id) {
                      navigate(`/profile`);
                    } else {
                      console.error("User ID is undefined");
                    }
                  }}
                  sx={{
                    py: 1.2,
                    "&:hover": { bgcolor: alpha("#B39DDB", 0.1) },
                  }}
                >
                  <AccountCircleOutlinedIcon
                    sx={{ mr: 1.5, color: "#B39DDB" }}
                  />
                  <Typography fontSize={14}>View Profile</Typography>
                </MenuItem>

                <Divider sx={{ my: 1, borderColor: alpha("#B39DDB", 0.1) }} />

                <MenuItem
                  onClick={() => {
                    handleCloseMenu();
                    logOut();
                  }}
                  sx={{
                    py: 1.2,
                    color: "#ef5350",
                    "&:hover": { bgcolor: alpha("#ef5350", 0.1) },
                  }}
                >
                  <LogoutOutlinedIcon sx={{ mr: 1.5 }} />
                  <Typography fontSize={14} fontWeight={500}>
                    Logout
                  </Typography>
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

import { Drawer, Stack, Box, Typography } from "@mui/material";
import InAuthenticatedSideBar from "@/components/side-bar/InAuthenticatedSideBar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import AuthenticatedSideBar from "@/components/side-bar/AuthenticatedSideBar";
import theme from "@/theme/theme";
const SideBar = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": {
          ...theme.custom.paperOverlay,
          boxSizing: "border-box",
          paddingTop: theme.custom.navBarHeight + 2,
          width: theme.custom.sideBarWidth,
          overflowY: "auto",
          overflowX: "hidden",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Stack
        spacing={3}
        sx={{
          px: 2,
          textAlign: "left",
          alignItems: "flex-start",
        }}
      >
        {!isAuthenticated ? (
          <InAuthenticatedSideBar />
        ) : (
          <AuthenticatedSideBar />
        )}
      </Stack>
      {!isAuthenticated && (
        <Box sx={{ mt: "auto", padding: 2, textAlign: "left" }}>
          <Typography fontSize={14} color="text.secondary">
            Need help? Contact us at:
          </Typography>
          <Typography fontSize={14} fontWeight={600}>
            support@groovity.com
          </Typography>
        </Box>
      )}
    </Drawer>
  );
};

export default SideBar;

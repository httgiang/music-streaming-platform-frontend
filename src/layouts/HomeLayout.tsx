import NavBar from "@/components/nav-bar/NavBar";
import SideBar from "@/components/side-bar/SideBar";
import theme from "@/theme/theme";
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import PlaybackControl from "@/components/music/PlaybackControl";

const HomeLayout = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <NavBar />
      <SideBar />

      <Box
        sx={{
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: theme.custom.navBarHeight,
          marginLeft: theme.custom.sideBarWidth,
        }}
      >
        <Outlet />
      </Box>
      <PlaybackControl />
    </Container>
  );
};

export default HomeLayout;

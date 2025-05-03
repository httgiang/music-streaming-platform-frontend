import NavBar from "@/components/nav-bar/NavBar";
import SideBar from "@/components/side-bar/SideBar";
import theme from "@/theme/theme";
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/material";
import PlaybackControl from "@/components/music/AudioPlayer";
import HomeFooter from "@/components/HomeFooter";

const HomeLayout = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <NavBar />
      <SideBar />

      <Box
        sx={{
          ...theme.custom.paperOverlay,

          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: theme.custom.navBarHeight,
          marginLeft: theme.custom.sideBarWidth,

          paddingBottom: "64px",
        }}
      >
        <Outlet />
        <HomeFooter />
        <PlaybackControl />
      </Box>
    </Container>
  );
};

export default HomeLayout;

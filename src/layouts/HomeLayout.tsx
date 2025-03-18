import NavBar from "@/components/nav-bar/NavBar";
import SideBar from "@/components/side-bar/SideBar";
import theme from "@/theme/theme";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import PlaybackControl from "@/components/PlaybackControl";

const HomeLayout = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <NavBar />
      <SideBar />

      <Container
        sx={{
          paddingTop: theme.custom.navBarHeight,
          marginLeft: theme.custom.sideBarWidth,
        }}
      >
        <Outlet />
        <PlaybackControl />
      </Container>
    </Container>
  );
};

export default HomeLayout;

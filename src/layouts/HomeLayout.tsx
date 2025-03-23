import NavBar from "@/components/nav-bar/NavBar";
import SideBar from "@/components/side-bar/SideBar";
import theme from "@/theme/theme";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import PlaybackControl from "@/components/PlaybackControl";
import HomeFooter from "@/components/HomeFooter";

const HomeLayout = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh"  }}>
      <NavBar />
      <SideBar />

      <Container
        sx={{
          paddingTop: theme.custom.navBarHeight,
          marginLeft: theme.custom.sideBarWidth,
          paddingBottom: '64px',
        }}
      >
        <Outlet />
        <HomeFooter />
        <PlaybackControl song={null} />
      </Container>
    </Container>
  );
};

export default HomeLayout;

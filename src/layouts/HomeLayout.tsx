import NavBar from "@/components/nav-bar/NavBar";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import PlaybackControl from "@/components/PlaybackControl";

const HomeLayout = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <NavBar />
      <Container
        sx={{
          paddingTop: 10,
        }}
      >
        <Outlet />
        <PlaybackControl />
      </Container>
    </Container>
  );
};

export default HomeLayout;

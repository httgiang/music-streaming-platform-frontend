import NavBar from "@/components/nav-bar/NavBar";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

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
      </Container>
    </Container>
  );
};

export default HomeLayout;

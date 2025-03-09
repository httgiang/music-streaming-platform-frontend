import { Container } from "@mui/material";
import SongCardsSlider from "@/components/slider/SongCardsSlider";
import HomeSection from "@/components/section/HomeSection";

const HomePage = () => {
  return (
    <Container>
      <HomeSection title="Trending Songs">
        <SongCardsSlider />
      </HomeSection>
    </Container>
  );
};

export default HomePage;

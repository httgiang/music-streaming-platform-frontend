import { Container, Stack } from "@mui/material";
import SongCardsSlider from "@/components/slider/SongCardsSlider";
import HomeSection from "@/components/section/HomeSection";
import SailorSongPic from "@/assets/sailor-song.jpg";
import TheBeatlesPic from "@/assets/the-beatles.jpg";
import HomeFooter from "@/components/HomeFooter";
import Elsa from "@/assets/let-it-go.jpg";

const HomePage = () => {
  const demoSongs = [
    {
      type: "song" as const,
      item: {
        id: 1,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
      },
    },
    {
      type: "song" as const,
      item: {
        id: 2,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: Elsa,
      },
    },
    {
      type: "song" as const,
      item: {
        id: 3,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
      },
    },
    {
      type: "song" as const,
      item: {
        id: 4,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
      },
    },
    {
      type: "song" as const,
      item: {
        id: 5,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
      },
    },
    {
      type: "song" as const,
      item: {
        id: 6,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
      },
    },
  ];
  const demoArtists = [
    {
      type: "artist" as const,
      item: {
        id: 1,
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: 2,
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: 3,
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: 4,
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: 5,
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: 6,
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
  ];
  return (
    <Container sx={{ paddingBottom: '64px' }}>
      <Stack spacing={4}>
        <HomeSection title="Trending Songs">
          <SongCardsSlider cardChildren={demoSongs} />
        </HomeSection>
        <HomeSection title="Popular Artists">
          <SongCardsSlider cardChildren={demoArtists} />
        </HomeSection>
      </Stack>
      <HomeFooter />
    </Container>
    
  );
};

export default HomePage;

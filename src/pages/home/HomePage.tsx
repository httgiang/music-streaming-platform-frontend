import { Container, Stack } from "@mui/material";
import SongCardsSlider from "@/components/music/MusicCardsSlider";
import HomeSection from "@/components/section/HomeSection";
import SailorSongPic from "@/assets/sailor-song.jpg";
import TheBeatlesPic from "@/assets/the-beatles.jpg";
import Elsa from "@/assets/let-it-go.jpg";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  const demoSongs = [
    {
      type: "song" as const,
      item: {
        id: 1,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
        duration: 2311,
      },
    },
    {
      type: "song" as const,
      item: {
        id: 2,
        title: "Let It Go",
        artist: "Indina Menzel",
        image: Elsa,
        duration: 243,
      },
    },
    {
      type: "song" as const,
      item: {
        id: 3,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
        duration: 2311,
      },
    },
    {
      type: "song" as const,
      item: {
        id: 4,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
        duration: 2311,
      },
    },
    {
      type: "song" as const,
      item: {
        id: 5,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
        duration: 2311,
      },
    },
    {
      type: "song" as const,
      item: {
        id: 6,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
        duration: 2311,
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
    <Container >
      <Stack spacing={4}>
        <HomeSection title="Trending Songs">
          <SongCardsSlider cardChildren={demoSongs} />
        </HomeSection>
        <HomeSection title="Popular Artists">
          <SongCardsSlider cardChildren={demoArtists} />
        </HomeSection>
      </Stack>
    </Container>
    
  );
};

export default HomePage;

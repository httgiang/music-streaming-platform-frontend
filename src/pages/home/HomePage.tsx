import { Container, Stack } from "@mui/material";
import SongCardsSlider from "@/components/music/MusicCardsSlider";
import HomeSection from "@/components/section/HomeSection";
import SailorSongPic from "@/assets/sailor-song.jpg";
import TheBeatlesPic from "@/assets/the-beatles.jpg";

const HomePage = () => {
  const demoSongs = [
    {
      type: "song" as "song",
      item: {
        id: 1,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
      },
    },
    {
      type: "song" as "song",
      item: {
        id: 2,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
      },
    },
    {
      type: "song" as "song",
      item: {
        id: 3,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
      },
    },
    {
      type: "song" as "song",
      item: {
        id: 4,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
      },
    },
    {
      type: "song" as "song",
      item: {
        id: 5,
        title: "Sailor Song",
        artist: "Gigi Perez",
        image: SailorSongPic,
      },
    },
    {
      type: "song" as "song",
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
      type: "artist" as "artist",
      item: {
        id: 1,
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as "artist",
      item: {
        id: 2,
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as "artist",
      item: {
        id: 3,
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as "artist",
      item: {
        id: 4,
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as "artist",
      item: {
        id: 5,
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as "artist",
      item: {
        id: 6,
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
  ];
  return (
    <Container>
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

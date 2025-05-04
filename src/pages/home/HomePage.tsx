import { Container, Stack } from "@mui/material";
import SongCardsSlider from "@/components/music/MusicCardsSlider";
import HomeSection from "@/components/section/HomeSection";
import TheBeatlesPic from "@/assets/the-beatles.jpg";
import { fetchSongs } from "@/api/music/song-api";
import { SongProps } from "@/types/song";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const { isLoading, data: songs } = useQuery<SongProps[]>({
    queryKey: ["songs"],
    queryFn: fetchSongs,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const demoArtists = [
    {
      type: "artist" as const,
      item: {
        id: "1",
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "2",
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "3",
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "4",
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "5",
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "6",
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
  ];

  const fetchedSongs = songs?.map((song) => ({
    type: "song" as const,
    item: {
      id: song.id,
      name: song.name,
      coverImageUrl: song.coverImageUrl,
      lyrics: song.lyrics ? song.lyrics : "",
      artist: song.artist ? song.artist : "",
      artistImage: song.artistImage ? song.artistImage : "",
    },
  }));

  return (
    <Container>
      <Stack spacing={4}>
        <HomeSection title="Trending Songs">
          <SongCardsSlider
            cardChildren={fetchedSongs || []}
            isLoading={isLoading}
          />
        </HomeSection>

        <HomeSection title="Popular Artists">
          <SongCardsSlider cardChildren={demoArtists} />
        </HomeSection>
      </Stack>
    </Container>
  );
};

export default HomePage;

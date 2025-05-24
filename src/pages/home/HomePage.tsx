import { Container, Stack, Box, Typography } from "@mui/material";
import SongCardsSlider from "@/components/music/MusicCardsSlider";
import HomeSection from "@/components/section/HomeSection";
import TheBeatlesPic from "@/assets/the-beatles.jpg";
import { fetchSongs } from "@/api/music/song-api";
import { SongProps } from "@/types/song";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import theme from "@/theme/theme";

const HomePage = () => {
  const { isLoading, data: songs } = useQuery<SongProps[]>({
    queryKey: ["songs"],
    queryFn: fetchSongs,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();

  const demoArtists = [
    {
      type: "artist" as const,
      item: {
        id: "1",
        name: "The Beatles",
        coverImageUrl: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "2",
        name: "The Beatles",
        coverImageUrl: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "3",
        name: "The Beatles",
        coverImageUrl: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "4",
        name: "The Beatles",
        coverImageUrl: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "5",
        name: "The Beatles",
        coverImageUrl: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "6",
        name: "The Beatles",
        coverImageUrl: TheBeatlesPic,
      },
    },
  ];

  const fetchedSongs = songs?.map((song) => ({
    type: "song" as const,
    item: {
      id: song.id,
      name: song.name,
      coverImageUrl: song.coverImageUrl,
      lyric: song.lyric ? song.lyric : "",
      duration: song.duration ? song.duration : 0,
      artist: song.artist ? song.artist : "",
      artistImage: song.artistImage ? song.artistImage : "",
    },
  }));

  return (
    <Container>
      <Stack spacing={4} mt={3}>
        <Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb="1rem"
          >
            <Typography fontSize={18} fontWeight={700} color="text.primary">
              Popular Songs
            </Typography>
            <Box onClick={() => navigate("/show-all", { state: fetchedSongs })}>
              <Typography
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                Show all
              </Typography>
            </Box>
          </Box>
          <SongCardsSlider
            cardChildren={fetchedSongs || []}
            isLoading={isLoading}
            slidesToShow={6}
          />
        </Box>
        <Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb="1rem"
          >
            <Typography fontSize={18} fontWeight={700} color="text.primary">
              Popular Artists
            </Typography>
            <Box onClick={() => navigate("/show-all", { state: demoArtists })}>
              <Typography
                sx={{
                  textDecoration: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "text.secondary",
                }}
              >
                Show all
              </Typography>
            </Box>
          </Box>
          <SongCardsSlider cardChildren={demoArtists} slidesToShow={6} />
        </Box>
      </Stack>
    </Container>
  );
};

export default HomePage;

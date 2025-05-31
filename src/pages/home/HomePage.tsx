import {
  Container,
  Stack,
  Box,
  Typography,
  Button,
  alpha,
  Grid,
  useTheme,
  Avatar,
  Paper,
  IconButton,
} from "@mui/material";
import { PlayArrow, PlayCircleFilled, LibraryMusic } from "@mui/icons-material";
import SongCardsSlider from "@/components/music/MusicCardsSlider";
import TheBeatlesPic from "@/assets/images/the-beatles.jpg";
import SummmerPlaylistImg from "@/assets/images/summer-playlist.jpg";
import HeaderImg from "@/assets/images/header-img.jpg";
import {
  fetchMostLikedSongs,
  fetchRecentlyLikedSongs,
} from "@/api/music/song-api";
import { SongProps } from "@/types/song";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { isLoading, data: mostLikedSongs } = useQuery<SongProps[]>({
    queryKey: ["mostLikedSongs"],
    queryFn: fetchMostLikedSongs,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { data: recentlyLikedSongs } = useQuery<SongProps[]>({
    queryKey: ["recentlyLikedSongs"],
    queryFn: fetchRecentlyLikedSongs,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const demoArtists = [
    {
      type: "artist" as const,
      item: {
        id: "1",
        name: "The Beatles",
        coverImageUrl: TheBeatlesPic,
      },
    },
  ];

  const fetchedSongs = mostLikedSongs?.map((song) => ({
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

  // Demo featured playlist
  const featuredPlaylist = {
    title: "Summer Vibes 2025",
    description: "The hottest tracks to elevate your summer mood",
    coverUrl: SummmerPlaylistImg,
    songCount: 24,
    duration: "1 hr 42 min",
  };

  type SectionHeadingProps = {
    title: string;
    showAll?: boolean;
    onShowAll?: () => void;
  };

  const SectionHeading = ({
    title,
    showAll = true,
    onShowAll = () => {},
  }: SectionHeadingProps) => (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography fontSize={20} fontWeight={700} color="text.primary">
        {title}
      </Typography>
      {showAll && (
        <Box onClick={onShowAll}>
          <Typography
            sx={{
              textDecoration: "none",
              cursor: "pointer",
              fontSize: 14,
              color: "text.secondary",
              "&:hover": {
                color: theme.palette.primary.main,
              },
            }}
          >
            Show all
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ pb: 6 }}>
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          height: 300,
          backgroundImage: `url(${HeaderImg})`,
          fitContent: "cover",
          backgroundSize: "contain",
          position: "relative",
          mb: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            alignItems: "flex-start",
            px: 4,
            pt: 4,
          }}
        >
          <Typography
            variant="h2"
            fontWeight={800}
            sx={{
              color: "white",
              fontSize: 56,
              lineHeight: 1.1,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Discover Your Sound
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.85)",
              width: 400,
              mt: 1,
              mb: 3,
            }}
          >
            Millions of songs to elevate your mood. Start streaming now.
          </Typography>
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            sx={{
              background: theme.custom.lightGradient,
              color: "white",
              borderRadius: 8,
              px: 4,
              py: 1.5,
              fontSize: 16,
              fontWeight: 600,
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              "&:hover": {
                bgcolor: "white",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              },
              width: "fit-content",
            }}
          >
            Start Listening
          </Button>
        </Box>
      </MotionBox>

      <Container maxWidth="xl">
        <Stack spacing={5}>
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionHeading title="Featured Playlist" />
            <MotionPaper
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              sx={{
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",
                borderRadius: 3,
                bgcolor: alpha(theme.palette.background.paper, 0.6),
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  height: 180,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={featuredPlaylist.coverUrl}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)",
                  }}
                />
              </Box>
              <Box
                sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                >
                  FEATURED PLAYLIST
                </Typography>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {featuredPlaylist.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.8 }}>
                  {featuredPlaylist.description}
                </Typography>
                <Box sx={{ display: "flex", gap: 3, color: "text.secondary" }}>
                  <Typography variant="body2">
                    {featuredPlaylist.songCount} songs
                  </Typography>
                  <Typography variant="body2">
                    {featuredPlaylist.duration}
                  </Typography>
                </Box>
              </Box>
            </MotionPaper>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SectionHeading
              title="Popular Songs"
              onShowAll={() => navigate("/show-all", { state: fetchedSongs })}
            />
            <SongCardsSlider
              cardChildren={fetchedSongs || []}
              isLoading={isLoading}
              slidesToShow={7}
            />
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <SectionHeading title="Recently Liked" />
            <Grid container spacing={2}>
              {recentlyLikedSongs?.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                  <MotionPaper
                    whileHover={{ scale: 1.02 }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1.5,
                      gap: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.paper, 0.4),
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      src={item.coverImageUrl}
                      sx={{ width: 60, height: 60 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={600}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.artist}
                      </Typography>
                    </Box>
                    <IconButton size="small">
                      <PlayArrow />
                    </IconButton>
                  </MotionPaper>
                </Grid>
              ))}
            </Grid>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <SectionHeading
              title="Popular Artists"
              onShowAll={() => navigate("/show-all", { state: demoArtists })}
            />
            <SongCardsSlider cardChildren={demoArtists} slidesToShow={6} />
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;

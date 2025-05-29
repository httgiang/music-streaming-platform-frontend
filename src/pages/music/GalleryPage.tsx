import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
  Chip,
  alpha,
  useTheme,
  Fade,
  CircularProgress,
} from "@mui/material";
import { SongProps } from "@/types/song";
import { AlbumProps } from "@/types/album";
import { ArtistProps } from "@/types/artist";
import { getLikedSongs } from "@/api/music/song-api";
import MusicPreviewCard from "@/components/music/MusicPreviewCard";
import { getLikedAlbums } from "@/api/music/album-api";
import { LibraryMusic, Person, Album } from "@mui/icons-material";

const GalleryPage = () => {
  const [songs, setSongs] = useState<SongProps[]>([]);
  const [albums, setAlbums] = useState<AlbumProps[]>([]);
  // Dummy data for artists until follow functionality is implemented
  const [artists] = useState<ArtistProps[]>([
    {
      id: "1",
      name: "The Weeknd",
      coverImageUrl: "https://i.scdn.co/image/ab6761610000e5eb94fbdb362091111a47db337d",
    },
    {
      id: "2",
      name: "Taylor Swift",
      coverImageUrl: "https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0",
    },
    {
      id: "3", 
      name: "Ed Sheeran",
      coverImageUrl: "https://i.scdn.co/image/ab6761610000e5eb3bcef85e105dfc42399ef0ba",
    },
  ]);
  const [filter, setFilter] = useState<"All" | "Songs" | "Albums" | "Artists">("All");
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setLoaded(true), 100);

    const fetchData = async () => {
      try {
        setLoading(true);
        const [likedSongs, likedAlbums] = await Promise.all([
          getLikedSongs(),
          getLikedAlbums(),
        ]);
        setSongs(likedSongs || []);
        setAlbums(likedAlbums || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const shouldShowContent = (filterType: "Songs" | "Albums" | "Artists") => {
    return filter === "All" || filter === filterType;
  };

  const getEmptyStateMessage = () => {
    switch (filter) {
      case "Songs":
        return "No songs liked yet. Start liking some songs to build your collection!";
      case "Albums":
        return "No albums liked yet. Like some albums to see them here!";
      case "Artists":
        return "No artists followed yet. Follow your favorite artists to see them here!";
      default:
        return "Nothing here yet. Start liking some songs and albums to build your collection!";
    }
  };

  return (
    <Fade in={loaded} timeout={800}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 3,
            textShadow: `0 2px 10px ${alpha("#000", 0.5)}`,
          }}
        >
          Your Gallery
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          mb={4}
          sx={{
            "& .MuiChip-root": {
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            },
          }}
        >
          <Chip
            icon={<LibraryMusic />}
            label="All"
            color={filter === "All" ? "secondary" : "default"}
            onClick={() => setFilter("All")}
            sx={{ fontSize: "0.9rem" }}
          />
          <Chip
            icon={<LibraryMusic />}
            label="Songs"
            color={filter === "Songs" ? "secondary" : "default"}
            onClick={() => setFilter("Songs")}
            sx={{ fontSize: "0.9rem" }}
          />
          <Chip
            icon={<Album />}
            label="Albums"
            color={filter === "Albums" ? "secondary" : "default"}
            onClick={() => setFilter("Albums")}
            sx={{ fontSize: "0.9rem" }}
          />
          <Chip
            icon={<Person />}
            label="Artists"
            color={filter === "Artists" ? "secondary" : "default"}
            onClick={() => setFilter("Artists")}
            sx={{ fontSize: "0.9rem" }}
          />
        </Stack>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
              flexDirection: "column",
              gap: 2,
            }}
          >
            <CircularProgress color="secondary" />
            <Typography color="text.secondary">Loading your library...</Typography>
          </Box>
        ) : !loading && (
          (filter === "All" && songs.length === 0 && albums.length === 0 && artists.length === 0) ||
          (filter === "Songs" && songs.length === 0) ||
          (filter === "Albums" && albums.length === 0) ||
          (filter === "Artists" && artists.length === 0)
        ) ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
              p: 3,
              backgroundColor: alpha(theme.palette.background.paper, 0.1),
              borderRadius: 2,
              border: `1px solid ${alpha("#fff", 0.1)}`,
            }}
          >
            <Typography color="text.secondary" align="center">
              {getEmptyStateMessage()}
            </Typography>
          </Box>
        ) : (
          <Fade in timeout={1000}>
            <Stack spacing={6}>
              {shouldShowContent("Songs") && songs.length > 0 && (
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <LibraryMusic sx={{ color: theme.palette.secondary.main }} />
                    Liked Songs
                  </Typography>
                  <Grid container spacing={2}>
                    {songs.map((song) => (
                      <Grid item xs={12} sm={6} md={3} lg={2} key={song.id}>
                        <Fade in timeout={800}>
                          <Box>
                            <MusicPreviewCard
                              type="song"
                              item={song}
                            />
                          </Box>
                        </Fade>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {shouldShowContent("Albums") && albums.length > 0 && (
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Album sx={{ color: theme.palette.secondary.main }} />
                    Liked Albums
                  </Typography>
                  <Grid container spacing={2}>
                    {albums.map((album) => (
                      <Grid item xs={12} sm={6} md={3} lg={2} key={album.id}>
                        <Fade in timeout={800}>
                          <Box>
                            <MusicPreviewCard
                              type="album"
                              item={album}
                            />
                          </Box>
                        </Fade>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {shouldShowContent("Artists") && artists.length > 0 && (
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Person sx={{ color: theme.palette.secondary.main }} />
                    Following
                  </Typography>
                  <Grid container spacing={2}>
                    {artists.map((artist) => (
                      <Grid item xs={12} sm={6} md={3} lg={2} key={artist.id}>
                        <Fade in timeout={800}>
                          <Box>
                            <MusicPreviewCard
                              type="artist"
                              item={artist}
                            />
                          </Box>
                        </Fade>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Stack>
          </Fade>
        )}
      </Container>
    </Fade>
  );
};

export default GalleryPage;

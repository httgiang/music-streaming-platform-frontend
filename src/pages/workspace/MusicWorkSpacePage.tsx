import {
  Card,
  Drawer,
  Divider,
  Paper,
  Typography,
  LinearProgress,
  Box,
  styled,
  Stack,
} from "@mui/material";
import UploadMusicIcon from "@/assets/upload-music.png";
import CreateAlbumIcon from "@/assets/album.png";
import ShareMusicIcon from "@/assets/share-music.png";
import UploadMusicDialog from "./UploadMusicPage";
import CreateAlbumDialog from "./CreateAlbumDialog";
import { useState } from "react";
import { searchSongsOrArtists } from "@/api/music/song-api";
import { searchAlbums } from "@/api/music/album-api";
import { useQuery } from "@tanstack/react-query";
import { SongProps } from "@/types/song";
import HomeSection from "@/components/section/HomeSection";
import SongCardsSlider from "@/components/music/MusicCardsSlider";
import theme from "@/theme/theme";
import { AlbumProps } from "@/types/album";

const ToolCard = styled(Card)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: 10,
  width: 160,
  padding: 10,
  cursor: "pointer",
  gap: 12,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateY(-3px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(201, 49, 255, 0.5)",
  },
}));

const StatCard = styled(Paper)(() => ({
  backgroundColor: "rgba(30, 30, 40, 0.6)",
  backdropFilter: "blur(10px)",
  borderRadius: 12,
  padding: "16px",
  border: "1px solid rgba(201, 49, 255, 0.1)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

const MusicWorkSpacePage = () => {
  const [openUploadMusic, setOpenUploadMusic] = useState(false);
  const [openCreateAlbumm, setOpenCreateAlbum] = useState(false);

  const handleUploadMusic = () => {
    setOpenUploadMusic(true);
  };
  const handleCloseUploadMusic = () => {
    setOpenUploadMusic(false);
  };

  const handleCreateAlbum = () => {
    setOpenCreateAlbum(true);
  };
  const handleCloseCreateAlbum = () => {
    setOpenCreateAlbum(false);
  };

  const storedUser = localStorage.getItem("user");
  if (!storedUser || storedUser === "undefined") {
    console.log(storedUser);
    return (
      <Typography color="textPrimary">
        Please log in to see your workspace
      </Typography>
    );
  }
  const user = JSON.parse(storedUser);

  const {
    isLoading,
    error,
    data: fetchedSongs,
  } = useQuery<SongProps[]>({
    queryKey: ["songs", user.id],
    queryFn: () => searchSongsOrArtists(user.id as string),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { data: fetchedAlbums } = useQuery<AlbumProps[]>({
    queryKey: ["albums", user.id],
    queryFn: () => searchAlbums(user.id as string),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const songsOfArtist =
    fetchedSongs?.map((song) => ({
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
    })) || [];

  const albumsByArtist =
    fetchedAlbums?.map((album) => ({
      type: "song" as const,
      item: {
        id: album.id,
        name: album.name,
        isPublic: album.isPublic,
        coverImageUrl: album.coverImageUrl,
        artist: album.artist ? album.artist : "",
      },
    })) || [];

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      padding={2}
      pt={0}
      height="100%"
    >
      {isLoading && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#c931ff",
              },
            }}
          />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Unable to load your songs. Please try again later.
        </Typography>
      )}

      <HomeSection title="Your songs">
        {!isLoading && songsOfArtist.length === 0 ? (
          <Box
            sx={{
              py: 8,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.02)",
              borderRadius: 2,
              border: "1px dashed rgba(255,255,255,0.1)",
            }}
          >
            <Typography color="text.secondary">
              No songs yet. Upload your first song with the tool on the right.
            </Typography>
          </Box>
        ) : (
          <SongCardsSlider
            cardChildren={songsOfArtist || []}
            isLoading={isLoading}
            slidesToShow={6}
          />
        )}
      </HomeSection>

      <HomeSection title="Your albums">
        <SongCardsSlider
          cardChildren={albumsByArtist || []}
          isLoading={isLoading}
          slidesToShow={6}
        />
      </HomeSection>

      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            pt: theme.custom.navBarHeight,
            zIndex: 1000,
            width: 220,
          },
        }}
        anchor="right"
        variant="permanent"
      >
        <Paper
          sx={{
            flex: 1,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            display={"flex"}
            gap={2}
            flexDirection="column"
            justifyContent={"space-between"}
          >
            <Typography fontSize={20} fontWeight={700} alignSelf="flex-start">
              Artist studio
            </Typography>
            <Box display={"flex"} flexDirection="column" gap={2}>
              <ToolCard onClick={handleUploadMusic}>
                <img src={UploadMusicIcon} width={25} height={25} />
                <Typography fontSize={14} fontWeight={600}>
                  Upload music
                </Typography>
              </ToolCard>
              <UploadMusicDialog
                onClose={handleCloseUploadMusic}
                open={openUploadMusic}
                onMusicUploaded={handleCloseUploadMusic}
              />

              <ToolCard onClick={handleCreateAlbum}>
                <img src={CreateAlbumIcon} width={25} height={25} />
                <Typography fontSize={14} fontWeight={600}>
                  Create album
                </Typography>
              </ToolCard>

              <CreateAlbumDialog
                onClose={handleCloseCreateAlbum}
                open={openCreateAlbumm}
              />

              <ToolCard onClick={handleCreateAlbum}>
                <img src={ShareMusicIcon} width={25} height={25} />
                <Typography fontSize={14} fontWeight={600}>
                  Share music
                </Typography>
              </ToolCard>

              <Divider
                sx={{
                  width: "100%",
                  marginTop: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              />
              <Stack direction="column" spacing={2}>
                <Typography
                  fontSize={20}
                  fontWeight={700}
                  gutterBottom
                  sx={{ marginTop: 2 }}
                  alignSelf="flex-start"
                >
                  Statistics
                </Typography>
                <Box display={"flex"} flexDirection="column" gap={2}>
                  <StatCard>
                    <Typography
                      fontSize={13}
                      fontWeight={500}
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      TOTAL PLAYS
                    </Typography>
                    <Typography
                      fontSize={26}
                      fontWeight={700}
                      sx={{
                        background:
                          "linear-gradient(90deg,rgb(250, 105, 255) 30%,rgb(243, 255, 108) 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      30,006,011
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={75}
                      sx={{
                        mt: 1.5,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(90deg,rgb(250, 105, 255) 30%,rgb(243, 255, 108) 100%)",
                          borderRadius: 2,
                        },
                      }}
                    />
                  </StatCard>

                  <StatCard>
                    <Typography
                      fontSize={13}
                      fontWeight={500}
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      TOTAL LIKES
                    </Typography>
                    <Typography
                      fontSize={26}
                      fontWeight={700}
                      sx={{
                        background:
                          "linear-gradient(90deg, #c931ff 0%, #ff7eb3 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      24,786
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={60}
                      sx={{
                        mt: 1.5,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(90deg, #c931ff 0%, #ff7eb3 100%)",
                          borderRadius: 2,
                        },
                      }}
                    />
                  </StatCard>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Drawer>
    </Box>
  );
};

export default MusicWorkSpacePage;

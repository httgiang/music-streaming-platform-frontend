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
  alpha,
  useTheme,
  Tooltip,
} from "@mui/material";
import {
  CloudUpload,
  Album,
  Share,
  MusicNote,
  ThumbUp,
} from "@mui/icons-material";
import UploadMusicDialog from "./UploadMusicPage";
import CreateAlbumDialog from "./CreateAlbumDialog";
import { useState } from "react";
import { getSongsByArtist } from "@/api/music/song-api";
import { searchAlbums } from "@/api/music/album-api";
import { useQuery } from "@tanstack/react-query";
import { SongProps } from "@/types/song";
import HomeSection from "@/components/section/HomeSection";
import SongCardsSlider from "@/components/music/MusicCardsSlider";
import { AlbumProps } from "@/types/album";
import { motion } from "framer-motion";

const ToolCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.background.paper, 0.2),
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
  borderRadius: 12,
  width: 180,
  height: 56,
  padding: "8px 16px",
  cursor: "pointer",
  gap: 14,
  transition: "all 0.25s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.15),
    transform: "translateY(-3px)",
    boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.3)}`,
    border: `1px solid ${alpha(theme.palette.secondary.main, 0.6)}`,
    "& .MuiSvgIcon-root": {
      transform: "scale(1.1)",
      color: theme.palette.secondary.main,
    },
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.3),
  backdropFilter: "blur(10px)",
  borderRadius: 16,
  padding: "18px",
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.15)}`,
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.2)}`,
  transition: "transform 0.35s ease, box-shadow 0.35s ease",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: `0 10px 25px ${alpha(theme.palette.common.black, 0.3)}`,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: 10,
  background: alpha(theme.palette.secondary.main, 0.15),
  transition: "all 0.25s ease",
}));

const MotionBox = motion(Box);

const MusicWorkSpacePage = () => {
  const theme = useTheme();
  const [openUploadMusic, setOpenUploadMusic] = useState(false);
  const [openCreateAlbum, setOpenCreateAlbum] = useState(false);

  const handleUploadMusic = () => setOpenUploadMusic(true);
  const handleCloseUploadMusic = () => setOpenUploadMusic(false);
  const handleCreateAlbum = () => setOpenCreateAlbum(true);
  const handleCloseCreateAlbum = () => setOpenCreateAlbum(false);

  const storedUser = localStorage.getItem("user");
  if (!storedUser || storedUser === "undefined") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 120px)",
          gap: 3,
          opacity: 0.8,
        }}
      >
        <MusicNote sx={{ fontSize: 60, opacity: 0.5 }} />
        <Typography
          color="textPrimary"
          variant="h6"
          sx={{
            maxWidth: 350,
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Please log in to access your artist workspace and manage your music
        </Typography>
      </Box>
    );
  }
  const user = JSON.parse(storedUser);

  const {
    isLoading,
    error,
    data: fetchedSongs,
  } = useQuery<SongProps[]>({
    queryKey: ["songs", user.id],
    queryFn: () => getSongsByArtist(user.id),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  const { data: fetchedAlbums } = useQuery<AlbumProps[]>({
    queryKey: ["albums", user.id],
    queryFn: () => searchAlbums(undefined, user.id),
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
      type: "album" as const,
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
      gap={3}
      padding={2}
      pt={1}
      height="100%"
      width="calc(100% - 260px)"
    >
      {isLoading && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: alpha(theme.palette.common.white, 0.1),
              "& .MuiLinearProgress-bar": {
                background: theme.custom.hoverGradient,
              },
            }}
          />
        </Box>
      )}

      {error && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: alpha("#f44336", 0.1),
            border: `1px solid ${alpha("#f44336", 0.3)}`,
          }}
        >
          <Typography color="error">
            Unable to load your songs. Please try again later.
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          p: 3,

          background: `linear-gradient(120deg, ${alpha(
            theme.palette.background.paper,
            0.4,
          )}, ${alpha(theme.palette.background.paper, 0.2)})`,
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.secondary.main, 0.15)}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography variant="h5" fontWeight={700} color="white" gutterBottom>
          Welcome to your Artist Studio,
          <span
            style={{
              background: theme.custom.lightGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginLeft: "8px",
            }}
          >
            {/* {user.username} */}
            tlinh
          </span>
          👋
        </Typography>
        <Typography color="text.secondary">
          Create, manage and share your music with listeners around the world.
          Track your performance and grow your audience.
        </Typography>
      </Box>

      <HomeSection title="Your songs">
        {!isLoading && songsOfArtist.length === 0 ? (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            sx={{
              py: 5,
              px: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.1),
              borderRadius: 2,
              border: `1px dashed ${alpha(theme.palette.secondary.main, 0.2)}`,
            }}
          >
            <CloudUpload
              sx={{
                fontSize: 48,
                color: alpha(theme.palette.secondary.main, 0.6),
              }}
            />
            <Typography
              color="text.secondary"
              sx={{
                maxWidth: 500,
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              You haven't uploaded any songs yet. Start sharing your music by
              clicking the "Upload music" button.
            </Typography>
          </MotionBox>
        ) : (
          <SongCardsSlider
            cardChildren={songsOfArtist || []}
            isLoading={isLoading}
            slidesToShow={6}
          />
        )}
      </HomeSection>

      <HomeSection title="Your albums">
        {!isLoading && albumsByArtist.length === 0 ? (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            sx={{
              py: 5,
              px: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.1),
              borderRadius: 2,
              border: `1px dashed ${alpha(theme.palette.secondary.main, 0.2)}`,
            }}
          >
            <Album
              sx={{
                fontSize: 48,
                color: alpha(theme.palette.secondary.main, 0.6),
              }}
            />
            <Typography
              color="text.secondary"
              sx={{
                maxWidth: 500,
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              You haven't created any albums yet. Organize your songs into
              albums to give your fans a complete listening experience.
            </Typography>
          </MotionBox>
        ) : (
          <SongCardsSlider
            cardChildren={albumsByArtist || []}
            isLoading={isLoading}
            slidesToShow={6}
          />
        )}
      </HomeSection>

      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            pt: theme.custom.navBarHeight,
            zIndex: 1000,
            width: 240,

            border: "none",
            backgroundColor: alpha(theme.palette.background.paper, 0.5),
            backdropFilter: "blur(20px)",
          },
        }}
        anchor="right"
        variant="permanent"
      >
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            padding: 2.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "transparent",
            borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            display={"flex"}
            gap={2.5}
            flexDirection="column"
            justifyContent={"space-between"}
            width="100%"
          >
            <Typography
              fontSize={20}
              fontWeight={700}
              alignSelf="flex-start"
              sx={{
                pb: 1,
                borderBottom: `2px solid ${alpha(
                  theme.palette.secondary.main,
                  0.5,
                )}`,
                display: "inline-block",
              }}
            >
              Creator Tools
            </Typography>

            <Stack direction="column" spacing={2}>
              <Tooltip title="Upload your music" placement="left" arrow>
                <ToolCard onClick={handleUploadMusic}>
                  <IconWrapper>
                    <CloudUpload sx={{ color: theme.palette.secondary.main }} />
                  </IconWrapper>
                  <Typography fontSize={15} fontWeight={600}>
                    Upload Music
                  </Typography>
                </ToolCard>
              </Tooltip>

              <UploadMusicDialog
                onClose={handleCloseUploadMusic}
                open={openUploadMusic}
                onMusicUploaded={handleCloseUploadMusic}
              />

              <Tooltip title="Create a new album" placement="left" arrow>
                <ToolCard onClick={handleCreateAlbum}>
                  <IconWrapper>
                    <Album sx={{ color: theme.palette.secondary.main }} />
                  </IconWrapper>
                  <Typography fontSize={15} fontWeight={600}>
                    Create Album
                  </Typography>
                </ToolCard>
              </Tooltip>

              <CreateAlbumDialog
                onClose={handleCloseCreateAlbum}
                open={openCreateAlbum}
              />

              <Tooltip title="Share your music" placement="left" arrow>
                <ToolCard>
                  <IconWrapper>
                    <Share sx={{ color: theme.palette.secondary.main }} />
                  </IconWrapper>
                  <Typography fontSize={15} fontWeight={600}>
                    Share Music
                  </Typography>
                </ToolCard>
              </Tooltip>
            </Stack>

            <Divider
              sx={{
                width: "100%",
                marginTop: 2,
                backgroundColor: alpha(theme.palette.divider, 0.1),
              }}
            />

            <Stack direction="column" spacing={3}>
              <Typography
                fontSize={20}
                fontWeight={700}
                gutterBottom
                alignSelf="flex-start"
                sx={{
                  pb: 1,
                  borderBottom: `2px solid ${alpha(
                    theme.palette.secondary.main,
                    0.5,
                  )}`,
                  display: "inline-block",
                }}
              >
                Performance
              </Typography>

              <StatCard>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1.5,
                      backgroundColor: alpha("#e91e63", 0.15),
                      mr: 1.5,
                    }}
                  >
                    <ThumbUp
                      sx={{ color: theme.palette.secondary.main, fontSize: 22 }}
                    />
                  </Box>
                  <Typography
                    fontSize={13}
                    fontWeight={600}
                    color="text.secondary"
                  >
                    TOTAL LIKES
                  </Typography>
                </Box>

                <Typography
                  fontSize={28}
                  fontWeight={800}
                  sx={{
                    background: theme.custom.lightGradient,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 0.5,
                  }}
                >
                  24.8K
                </Typography>

                <Typography
                  fontSize={13}
                  color="text.secondary"
                  sx={{ mb: 1.5 }}
                >
                  +8% from last month
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={60}
                  sx={{
                    height: 5,
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.common.white, 0.1),
                    "& .MuiLinearProgress-bar": {
                      background: theme.custom.hoverGradient,
                      borderRadius: 3,
                    },
                  }}
                />
              </StatCard>
            </Stack>
          </Box>
        </Paper>
      </Drawer>

      <UploadMusicDialog
        onClose={handleCloseUploadMusic}
        open={openUploadMusic}
        onMusicUploaded={handleCloseUploadMusic}
      />

      <CreateAlbumDialog
        onClose={handleCloseCreateAlbum}
        open={openCreateAlbum}
      />
    </Box>
  );
};

export default MusicWorkSpacePage;

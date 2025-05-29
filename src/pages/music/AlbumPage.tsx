import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Stack,
  Skeleton,
  CardMedia,
  Card,
  Fade,
  alpha,
  useTheme,
  Grow,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  MusicNote,
  PlayArrow,
  FavoriteBorder,
  Favorite,
  Share,
  Download,
} from "@mui/icons-material";
import { AlbumProps } from "@/types/album";
//@ts-ignore
import ColorThief from "colorthief";
import {
  getSongsByAlbum,
  getAlbumLikeStatus,
  likeAlbum,
  unlikeAlbum,
} from "@/api/music/album-api";
import { SongProps } from "@/types/song";
import MusicCard from "@/components/music/MusicCard";
import { useToast } from "@/contexts/ToastContext";
import { useDispatch } from "react-redux";
import { playSong } from "@/features/music/playerSlice";

const AlbumPage: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const location = useLocation();
  const [songs, setSongs] = useState<SongProps[]>([]);
  const { id } = useParams<{ id: string }>();
  const album = location.state as AlbumProps;
  const coverImageUrl = album.coverImageUrl;
  const showToast = useToast();

  const [bgColor, setBgGradient] = useState<string>("rgba(0, 0, 0, 0.8)");
  const [loaded, setLoaded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleLikeAlbum = async () => {
    try {
      await likeAlbum(album.id);
      setLiked(true);
      showToast("Added to your liked albums", "success");
    } catch (error) {
      console.error("Failed to like album:", error);
      showToast("Failed to like album", "error");
    }
  };

  const handleUnlikeAlbum = async () => {
    try {
      await unlikeAlbum(album.id);
      setLiked(false);
      showToast("Removed from your liked albums", "success");
    } catch (error) {
      console.error("Failed to unlike album:", error);
      showToast("Failed to unlike album", "error");
    }
  };

  useEffect(() => {
    if (id) {
      getAlbumLikeStatus(id)
        .then((status) => setLiked(status))
        .catch((error) => console.error("Failed to get like status:", error));
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setLoaded(true), 100);
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      if (id) {
        console.log("Fetching songs for album ID:", id); // Debugging log
        try {
          const albumSongs = await getSongsByAlbum(id);

          console.log("Filtered API Response for getSongsByAlbum:", albumSongs); // Debugging log
          if (Array.isArray(albumSongs) && albumSongs.length > 0) {
            setSongs(albumSongs);
          } else {
            console.warn("No songs found for album ID:", id);
          }
        } catch (error) {
          console.error("Failed to fetch songs for album:", error);
        }
      } else {
        console.error("Album ID is missing.");
      }
    };
    fetchSongs();
  }, [id]);

  useEffect(() => {
    if (!coverImageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = coverImageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 3);
      if (palette.length >= 2) {
        const [color1, color2, color3] = palette;
        setBgGradient(
          `linear-gradient(135deg, 
              rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.4) 0%,
              rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.3) 50%,
              rgba(${color3?.[0] || color1[0]}, ${color3?.[1] || color1[1]}, ${
            color3?.[2] || color1[2]
          }, 0.2) 100%)`,
        );
      }
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [album, coverImageUrl]);
  const ActionButton = ({
    icon,
    tooltip,
    onClick,
    delay = 0,
  }: {
    icon: React.ReactNode;
    tooltip: string;
    onClick?: () => void;
    delay?: number;
  }) => (
    <Grow in={loaded} timeout={600} style={{ transitionDelay: `${delay}ms` }}>
      <Tooltip title={tooltip} placement="top">
        <IconButton
          onClick={onClick}
          sx={{
            color: "white",
            backdropFilter: "blur(10px)",
            backgroundColor: alpha("#fff", 0.1),
            border: `1px solid ${alpha("#fff", 0.2)}`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              backgroundColor: alpha("#fff", 0.2),
              transform: "translateY(-2px)",
              boxShadow: `0 8px 32px ${alpha("#000", 0.3)}`,
            },
          }}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </Grow>
  );

  return (
    <Container sx={{ padding: "10px", textAlign: "center" }}>
      <Fade in={loaded} timeout={800}>
        <Card
          sx={{
            background: bgColor,
            backdropFilter: "blur(20px)",
            border: `1px solid ${alpha("#fff", 0.2)}`,
            borderRadius: 4,
            p: 4,
            overflow: "hidden",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: `0 20px 60px ${alpha("#000", 0.4)}`,
            },
          }}
        >
          <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
            <Box sx={{ flexShrink: 0, position: "relative" }}>
              {!album.coverImageUrl ? (
                <Skeleton
                  variant="rounded"
                  width={270}
                  height={270}
                  sx={{
                    borderRadius: 3,
                    bgcolor: alpha("#B39DDB", 0.1),
                  }}
                />
              ) : (
                <CardMedia
                  component="img"
                  image={album.coverImageUrl}
                  alt="Song cover"
                  sx={{
                    width: 280,
                    height: 280,
                    borderRadius: 3,
                    objectFit: "cover",
                    boxShadow: `0 15px 40px ${alpha("#000", 0.5)}`,
                  }}
                />
              )}
            </Box>
            <Stack
              spacing={2}
              sx={{ flex: 1, minWidth: 0, textAlign: "left" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MusicNote
                  sx={{ color: alpha("#fff", 0.7), fontSize: "1.2rem" }}
                />
                <Typography
                  variant="overline"
                  sx={{
                    color: alpha("#fff", 0.8),
                    fontWeight: 600,
                    letterSpacing: 2,
                  }}
                >
                  Album
                </Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  wordBreak: "break-word",
                  textShadow: `0 4px 20px ${alpha("#000", 0.5)}`,
                }}
              >
                {album.name}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: alpha("#fff", 0.9),
                  fontWeight: 500,
                  textShadow: `0 2px 10px ${alpha("#000", 0.3)}`,
                }}
              >
                {album.artist}
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              float: "right",
            }}
          >
            <Grow
              in={loaded}
              timeout={800}
              style={{ transitionDelay: "200ms" }}
            >
             <Box onClick={() => dispatch(playSong(song))}>
                  <PlayArrow
                    sx={{
                      backgroundColor: theme.palette.secondary.main,
                      color: "white",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      cursor: "pointer",
                    }}
                  />
                </Box>
            </Grow>
            {liked ? (
                <ActionButton
                  icon={
                    <Favorite sx={{ color: theme.palette.secondary.main }} />
                  }
                  tooltip="Unlike album"
                  onClick={handleUnlikeAlbum}
                  delay={250}
                />
              ) : (
                <ActionButton
                  icon={
                    <FavoriteBorder
                      sx={{ color: theme.palette.secondary.main }}
                    />
                  }
                  tooltip="Like album"
                  onClick={handleLikeAlbum}
                  delay={250}
                />
              )}

              <ActionButton icon={<Share />} tooltip="Share" delay={350} />
              <ActionButton
                icon={<Download />}
                tooltip="Download"
                delay={400}
              />
          </Box>
        </Card>
      </Fade>
      <Typography
        variant="h5"
        color="white"
        fontWeight="bold"
        sx={{ marginTop: 4, marginBottom: 2, textAlign: "left" }}
      >
        Songs in Album
      </Typography>
      <Stack spacing={2}>
        {songs.map((song) => (
          <Box
            key={song.id}
            sx={{
              "&:hover": {
                backgroundColor: alpha("#fff", 0.1),
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
              },
              padding: 1,
            }}
          >
            <MusicCard
              song={{
                ...song,
                duration: song.duration || 0,
                lyric: song.lyric || "",
                artistImage: song.artistImage || "",
                likesCount: song.likesCount || 0
              }}
            />
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default AlbumPage;

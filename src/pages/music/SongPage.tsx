import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Skeleton,
  alpha,
  Card,
  CardMedia,
  Avatar,
  Stack,
  Paper,
  Fade,
  Grow,
} from "@mui/material";
import { SongProps } from "@/types/song";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ColorThief from "colorthief";
import { playSong } from "@/features/music/playerSlice";
import {
  Share,
  Download,
  MusicNote,
  PlayArrow,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import theme from "@/theme/theme";
import { likeSong, unlikeSong, getSongLikeStatus } from "@/api/music/song-api";

const SongPage = () => {
  const [bgColor, setBgGradient] = useState<string>("rgba(0, 0, 0, 0.8)");
  const [loaded, setLoaded] = useState(false);
  const [liked, setLiked] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const song = location.state as SongProps;

  const toggleLikeSong = async () => {
    try {
      if (!liked) {
        const res = await likeSong(song.id);
        if (res.status === "success") {
          setLiked(true);
        }
      } else {
        const res = await unlikeSong(song.id);
        if (res.status === "success") {
          setLiked(false);
        }
      }
    } catch (error) {
      console.error("Failed to toggle song like:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setLoaded(true), 100);

    const checkLikeStatus = async () => {
      try {
        const status = await getSongLikeStatus(song.id);
        setLiked(status);
      } catch (error) {
        console.error("Failed to get song like status:", error);
      }
    };
    checkLikeStatus();
  }, [song.id]);

  useEffect(() => {
    if (!song.coverImageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = song.coverImageUrl;

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
  }, [song.coverImageUrl]);

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
            color: theme.palette.secondary.main,
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

  const lyricsLines = song?.lyric?.split("\n") || [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${alpha("#000", 0.8)} 0%, ${alpha(
          "#000",
          0.95,
        )} 100%)`,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: bgColor,
          opacity: 0.3,
          transition: "opacity 0.5s ease",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ py: 3, position: "relative", zIndex: 1 }}>
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
                {!song.coverImageUrl ? (
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
                    image={song.coverImageUrl}
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
                    Single
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
                  {song.name}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: alpha("#fff", 0.9),
                    fontWeight: 500,
                    textShadow: `0 2px 10px ${alpha("#000", 0.3)}`,
                  }}
                >
                  {song.artist}
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
                  tooltip="Unlike song"
                  onClick={toggleLikeSong}
                  delay={250}
                />
              ) : (
                <ActionButton
                  icon={
                    <FavoriteBorder
                      sx={{ color: theme.palette.secondary.main }}
                    />
                  }
                  tooltip="Like song"
                  onClick={toggleLikeSong}
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

        <Fade in={loaded} timeout={1000} style={{ transitionDelay: "300ms" }}>
          <Box
            sx={{
              mt: 6,
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 8,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: "bold",
                  color: "white",
                  textShadow: `0 2px 10px ${alpha("#000", 0.5)}`,
                }}
              >
                Lyrics
              </Typography>

              <Paper
                sx={{
                  background: `linear-gradient(145deg, ${alpha(
                    "#fff",
                    0.08,
                  )}, ${alpha("#fff", 0.03)})`,
                  backdropFilter: "blur(15px)",
                  border: `1px solid ${alpha("#fff", 0.1)}`,
                  borderRadius: 3,
                  p: 0,
                  pl: 5,
                  height: "600px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Box
                  className="custom-scrollbar"
                  sx={{
                    height: "100%",
                    overflowY: "auto",
                    overflowX: "hidden",
                    p: 4,
                  }}
                >
                  {lyricsLines.length > 0 ? (
                    <Stack spacing={2}>
                      {lyricsLines.map((line, index) => (
                        <Typography
                          key={index}
                          variant="body1"
                          sx={{
                            color:
                              line.trim() === ""
                                ? "transparent"
                                : alpha("#fff", 0.85),
                            lineHeight: 1.8,
                            fontSize: "1.1rem",
                            fontWeight: 400,
                            transition: "all 0.2s ease",
                            textAlign: "left",
                            minHeight: line.trim() === "" ? "1.2rem" : "auto",
                            cursor: "default",
                            "&:hover": {
                              color:
                                line.trim() === "" ? "transparent" : "white",
                              transform: "translateX(4px)",
                            },
                          }}
                        >
                          {line.trim() === "" ? "\u00A0" : line}{" "}
                        </Typography>
                      ))}
                      <Box sx={{ height: "2rem" }} />
                    </Stack>
                  ) : (
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: alpha("#fff", 0.5),
                          textAlign: "center",
                          mb: 2,
                        }}
                      >
                        No lyrics available
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: alpha("#fff", 0.3),
                          textAlign: "center",
                        }}
                      >
                        Enjoy the music! 🎵
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "20px",
                    background: `linear-gradient(transparent, ${alpha(
                      "#000",
                      0.1,
                    )})`,
                    pointerEvents: "none",
                  }}
                />
              </Paper>
            </Box>

            <Box>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  fontWeight: "bold",
                  color: "white",
                  textShadow: `0 2px 10px ${alpha("#000", 0.5)}`,
                }}
              >
                Artist
              </Typography>

              <Paper
                sx={{
                  background: `linear-gradient(145deg, ${alpha(
                    "#fff",
                    0.08,
                  )}, ${alpha("#fff", 0.03)})`,
                  backdropFilter: "blur(15px)",
                  border: `1px solid ${alpha("#fff", 0.1)}`,
                  borderRadius: 3,
                  p: 4,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 12px 40px ${alpha("#000", 0.3)}`,
                  },
                }}
              >
                <Stack direction="row" spacing={3} alignItems="center">
                  <Avatar
                    src={song.artistImage}
                    alt={song.artist}
                    sx={{
                      width: 80,
                      height: 80,
                      border: `3px solid ${alpha("#fff", 0.2)}`,
                      boxShadow: `0 8px 32px ${alpha("#000", 0.4)}`,
                    }}
                  />
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha("#fff", 0.7),
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontSize: "0.75rem",
                        mb: 1,
                      }}
                    >
                      Artist
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textShadow: `0 2px 8px ${alpha("#000", 0.3)}`,
                      }}
                    >
                      {song.artist}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default SongPage;

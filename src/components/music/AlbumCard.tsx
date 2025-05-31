import { getSongsByAlbum } from "@/api/music/album-api";
import {
  Box,
  Card,
  Typography,
  IconButton,
  alpha,
  Skeleton,
  Divider,
  useTheme,
  Tooltip,
} from "@mui/material";
import {
  PlayArrow,
  Favorite,
  MoreVert,
  FavoriteBorder,
  PlayCircleOutline,
  MusicNote,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SongProps } from "@/types/song";
import { AlbumProps } from "@/types/album";
import { useDispatch } from "react-redux";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

interface AlbumPreviewCardProps {
  album: AlbumProps;
  onPlay?: (songId: string) => void;
}

const AlbumPreviewCard = ({ album, onPlay }: AlbumPreviewCardProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [previewSongs, setPreviewSongs] = useState<SongProps[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [likedSongs, setLikedSongs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setIsLoading(true);
        const response = await getSongsByAlbum(album.id);
        if (response?.status === 200) {
          // Get up to 3 songs for preview
          const songs = response.data.data.slice(0, 3);
          setPreviewSongs(songs);
        }
      } catch (error) {
        console.error("Error fetching album songs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (album?.id) {
      fetchSongs();
    }
  }, [album?.id]);

  const handlePlaySong = (song: SongProps) => {
    if (onPlay) {
      onPlay(song.id);
    } else {
    }
  };

  const handleNavigateToAlbum = () => {
    navigate(`/album/${album.id}`);
  };

  const toggleLikeSong = (songId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setLikedSongs((prev) => ({
      ...prev,
      [songId]: !prev[songId],
    }));
  };

  return (
    <MotionCard
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: "blur(10px)",
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.15)}`,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Album Cover with Play Button Overlay */}
      <Box
        sx={{
          position: "relative",
          height: 220,
          width: "100%",
          overflow: "hidden",
        }}
      >
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            height="100%"
            width="100%"
            animation="wave"
            sx={{ bgcolor: alpha(theme.palette.background.paper, 0.1) }}
          />
        ) : (
          <>
            <Box
              component="img"
              src={album.coverImageUrl}
              alt={album.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
                transform: isHovering ? "scale(1.1)" : "scale(1)",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: isHovering
                  ? "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)"
                  : "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
                transition: "background 0.3s ease",
              }}
            />

            <MotionBox
              animate={{
                opacity: isHovering ? 1 : 0,
                y: isHovering ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <IconButton
                onClick={() =>
                  previewSongs[0] && handlePlaySong(previewSongs[0])
                }
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                  width: 60,
                  height: 60,
                  boxShadow: `0 4px 14px ${alpha(
                    theme.palette.common.black,
                    0.4,
                  )}`,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                    transform: "scale(1.05)",
                  },
                  transition: "transform 0.2s",
                }}
              >
                <PlayArrow sx={{ fontSize: 32 }} />
              </IconButton>
            </MotionBox>

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                p: 2,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  color: "white",
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
                onClick={handleNavigateToAlbum}
                noWrap
              >
                {album.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: alpha("#fff", 0.8),
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
                noWrap
              >
                {album.artist || "Various Artists"}
              </Typography>
            </Box>
          </>
        )}
      </Box>

      {/* Preview Songs List */}
      <Box sx={{ p: 1 }}>
        {isLoading ? (
          // Loading skeletons for 3 songs
          [...Array(3)].map((_, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", p: 1 }}
            >
              <Skeleton
                variant="circular"
                width={32}
                height={32}
                sx={{ mr: 1.5 }}
              />
              <Box sx={{ width: "100%" }}>
                <Skeleton width="70%" height={20} />
                <Skeleton width="40%" height={16} />
              </Box>
            </Box>
          ))
        ) : previewSongs.length > 0 ? (
          previewSongs.map((song, index) => (
            <Box key={song.id}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  borderRadius: 1,
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
                onClick={() => handlePlaySong(song)}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    mr: 1.5,
                    color: theme.palette.text.secondary,
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      opacity: isHovering ? 0 : 1,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {index + 1}
                  </Typography>
                  {isHovering && (
                    <PlayCircleOutline
                      sx={{
                        position: "absolute",
                        color: theme.palette.primary.main,
                        fontSize: 20,
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" fontWeight={500} noWrap>
                    {song.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {song.artist || album.artist || "Unknown Artist"}
                  </Typography>
                </Box>

                {song.duration && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ px: 1 }}
                  >
                    {/* {formatDuration(song.duration)} */}
                  </Typography>
                )}

                <IconButton
                  size="small"
                  onClick={(e) => toggleLikeSong(song.id, e)}
                  sx={{
                    color: likedSongs[song.id]
                      ? theme.palette.error.main
                      : "inherit",
                    opacity: likedSongs[song.id] ? 1 : 0.7,
                  }}
                >
                  {likedSongs[song.id] ? (
                    <Favorite fontSize="small" />
                  ) : (
                    <FavoriteBorder fontSize="small" />
                  )}
                </IconButton>
              </Box>

              {index < previewSongs.length - 1 && (
                <Divider sx={{ opacity: 0.3 }} />
              )}
            </Box>
          ))
        ) : (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <MusicNote
              color="disabled"
              sx={{ fontSize: 40, opacity: 0.5, mb: 1 }}
            />
            <Typography variant="body2" color="text.secondary">
              No preview songs available
            </Typography>
          </Box>
        )}
      </Box>

      {/* View Full Album Footer */}
      {previewSongs.length > 0 && (
        <Box>
          <Divider sx={{ opacity: 0.5 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 1.5,
              cursor: "pointer",
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
              },
            }}
            onClick={handleNavigateToAlbum}
          >
            <Typography variant="body2" fontWeight={600} color="primary">
              View Full Album
            </Typography>
          </Box>
        </Box>
      )}
    </MotionCard>
  );
};

export default AlbumPreviewCard;

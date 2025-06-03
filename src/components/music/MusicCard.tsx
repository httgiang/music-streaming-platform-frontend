import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Favorite from "@mui/icons-material/Favorite";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useNavigate } from "react-router-dom";
import { SongProps } from "@/types/song";
import { likeSong, unlikeSong, getSongLikeStatus } from "@/api/music/song-api";
import theme from "@/theme/theme";

export interface MusicCardSongProps {
  coverImageUrl: string;
  name: string;
  artist: string;
  duration: string;
}

interface MusicCardProps {
  song: SongProps;
  onLikeChange?: (songId: string, liked: boolean) => void;
}

const MusicCard: React.FC<MusicCardProps> = ({ song, onLikeChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const toggleLikeSong = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent double click navigation
    try {
      if (!liked) {
        const res = await likeSong(song.id);
        if (res.status === "success") {
          setLiked(true);
          onLikeChange?.(song.id, true);
        }
      } else {
        const res = await unlikeSong(song.id);
        if (res.status === "success") {
          setLiked(false);
          onLikeChange?.(song.id, false);
        }
      }
    } catch (error) {
      console.error("Failed to toggle song like:", error);
    }
  };

  useEffect(() => {
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

  const onSongDoubleClick = useCallback(
    (song: SongProps) => {
      navigate(`/song/${song.id}`, { state: song });
    },
    [navigate],
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      borderRadius={3}
      mr={1}
      sx={{
        backdropFilter: "blur(6px)",
        transition: "background-color 0.3s ease",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onDoubleClick={() => onSongDoubleClick(song)}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <MusicNoteIcon sx={{ color: "white" }} />
        <img
          src={song.coverImageUrl}
          alt={song.name}
          style={{ width: 55, height: 55, borderRadius: 3 }}
        />
        <Box textAlign="left">
          <Typography fontSize={16} fontWeight="bold" color="white">
            {song.name}
          </Typography>
          <Typography color="white" fontSize={14} marginRight="15px">
            {song.artist}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
        {isHovered && (
          <>
            <Tooltip
              title={
                <span style={{ fontSize: "16px" }}>
                  {liked ? "Unlike" : "Like"}
                </span>
              }
              componentsProps={{
                tooltip: { sx: { backgroundColor: "gray" } },
                popper: {
                  modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
                },
              }}
              placement="top"
            >
              <IconButton
                sx={{ color: "white" }}
                size="small"
                onClick={toggleLikeSong}
              >
                {liked ? (
                  <Favorite
                    sx={{ height: "18px", color: theme.palette.secondary.main }}
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon sx={{ height: "18px" }} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip
              title={<span style={{ fontSize: "16px" }}>Add to playlist</span>}
              componentsProps={{
                tooltip: { sx: { backgroundColor: "gray" } },
                popper: {
                  modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
                },
              }}
              placement="top"
            >
              <IconButton sx={{ color: "white" }} size="small">
                <AddCircleOutlineIcon sx={{ height: "18px" }} />
              </IconButton>
            </Tooltip>
          </>
        )}

        <Typography
          variant="body2"
          color="white"
          textAlign="center"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          {/* {song.duration} */}
          3:45
        </Typography>
      </Box>
    </Box>
  );
};

export default MusicCard;

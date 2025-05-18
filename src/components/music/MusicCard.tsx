import React, { useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

export interface MusicCardSongProps {
  coverImageUrl: string;
  name: string;
  artist: string;
  duration: string;
}

const MusicCard: React.FC<{ song: MusicCardSongProps }> = ({ song }) => {
  const [isHovered, setIsHovered] = useState(false);

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
        <Tooltip
          title={<span style={{ fontSize: "16px" }}>Favorite</span>}
          componentsProps={{
            tooltip: { sx: { backgroundColor: "gray" } },
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
            },
          }}
          placement="top"
        >
          <IconButton sx={{ color: "white" }} size="small">
            <FavoriteBorderOutlinedIcon sx={{ height: "18px" }} />
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

        <Typography
          variant="body2"
          color="white"
          textAlign="center"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          {/* {song.duration} */}
          3:45
        </Typography>
        {isHovered && (
          <IconButton sx={{ color: "white" }} size="small">
            <MoreHorizIcon sx={{ height: "18px" }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default MusicCard;

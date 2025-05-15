import React, { useCallback, useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';
import { SongProps } from '@/types/song';

const MusicCard: React.FC<{ song: SongProps }> = ({ song }) => {
  const [isHovered, setIsHovered] = useState(false);
   const navigate = useNavigate();
  
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
      onDoubleClick={() => onSongDoubleClick(song)}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <img
          src={song.coverImageUrl}
          alt={song.name}
          style={{ width: 40, height: 40, borderRadius: 5 }}
        />
        <Box textAlign="left">
          <Typography variant="body2" fontWeight="bold" color="white">
            {song.name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="white"
            fontSize="small"
            marginRight="15px"
          >
            {song.artist}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        sx={{ width: "120px" }}
      >
        {isHovered && (
          <Tooltip
            title={<span style={{ fontSize: "16px" }}>Add to favorite</span>}
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
        )}
        <Typography
          variant="body2"
          color="white"
          textAlign="center"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          {song.duration}
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

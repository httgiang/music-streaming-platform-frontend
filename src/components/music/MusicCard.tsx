import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface Song {
  coverImageUrl: string;
  name: string;
  artist: string;
  duration: string;
}

const MusicCard: React.FC<{ song: Song }> = ({ song }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
    >
      <Box display="flex" alignItems="center" gap={1}>
        <img
          src={song.coverImageUrl}
          alt={song.name}
          style={{ width: 40, height: 40, borderRadius: 5 }}
        />
        <Box textAlign="left">
          <Typography variant="body2" fontWeight="bold">
            {song.name}
          </Typography>
          <Typography
            variant="subtitle2"
            color="gray"
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
            <IconButton color="inherit">
              <AddCircleOutlineIcon sx={{ height: "18px" }} />
            </IconButton>
          </Tooltip>
        )}
        <Typography
          variant="body2"
          color="gray"
          textAlign="center"
          sx={{ flexGrow: 1, textAlign: "center" }} 
        >
          {song.duration}
        </Typography>
        {isHovered && (
          <IconButton color="inherit">
            <MoreHorizIcon sx={{ height: "18px" }} />
          </IconButton>
        )}
      </Box>
    
    </Box>
  );
};

export default MusicCard;

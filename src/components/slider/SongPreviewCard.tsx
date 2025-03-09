import { Card, CardMedia, Box, Typography } from "@mui/material";
import { SongProps } from "@/types/song";
import { IconButton } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";
import { useState } from "react";

const PlayButtons = () => {
  return (
    <IconButton>
      <PlayCircle sx={{ color: "red" }} />
    </IconButton>
  );
};

const SongPreviewCard = ({ song }: { song: SongProps }) => {
  const [isPlayButtonVisible, setPlayButtonVisible] = useState(false);
  const handleMouseEnter = () => {
    setPlayButtonVisible(true);
  };
  const handleMouseLeave = () => {
    setPlayButtonVisible(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingX: 3,
        paddingY: 2,
        width: 150,
        height: 200,
        backgroundColor: "black",
        color: "white",
        "&:hover": {
          cursor: "pointer",
          transform: "scale(1.05)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardMedia
        sx={{ height: 150, width: 150, objectFit: "cover" }}
        image={song.cover}
        title="Sailor Song"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 1,
          textAlign: "left",
          paddingLeft: 1,
        }}
      >
        <Typography fontSize={16}>{song.title}</Typography>
        <Typography fontSize={14}>{song.artist}</Typography>
        {isPlayButtonVisible && (
          <Box
            sx={{
              position: "absolute",
              right: 20,
              transform: "scale(2.0)",
            }}
          >
            <PlayButtons />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default SongPreviewCard;

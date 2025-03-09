import { Card, CardMedia, Box, Typography } from "@mui/material";
import { SongProps } from "@/types/song";
import { ArtistProps } from "@/types/artist";
import { PlayButtons } from "@/components/iconbuttons/IconButtons";
import { useState } from "react";

export interface MusicPreviewCardProps {
  type: "song" | "artist";
  item: SongProps | ArtistProps;
}

const MusicPreviewCard: React.FC<MusicPreviewCardProps> = ({ item, type }) => {
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
        sx={{
          height: 150,
          width: 150,
          objectFit: "cover",
          borderRadius: type === "artist" ? "50%" : "0%",
        }}
        image={item.image}
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
        <Typography variant="body1">
          {type === "song"
            ? (item as SongProps).title
            : (item as ArtistProps).name}
        </Typography>
        <Typography fontSize={14}>
          {type === "song" ? (item as SongProps).artist : "Artist"}
        </Typography>
        {isPlayButtonVisible && (
          <Box
            sx={{
              position: "absolute",
              right: 20,
              transform: "scale(2.0)",
            }}
          >
            <PlayButtons onClick={() => console.log("to be implemented")} />
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default MusicPreviewCard;

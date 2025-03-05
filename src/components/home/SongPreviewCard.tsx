import SailorSongPic from "@/assets/sailor-song.jpg";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const SongPreviewCard = () => {
  const song = {
    title: "Sailor Song",
    artist: "Gigi Perez",
    cover: SailorSongPic,
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        paddingX: 3,
        paddingY: 2,
        alignItems: "center",
        width: 250,
        height: 400,
        backgroundColor: "#000000",
        color: "alpha(#ffffff, 0.7)",
        "&:hover": {
          cursor: "pointer",
          transform: "scale(1.1)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      <CardMedia
        sx={{ height: 250, width: 250, objectFit: "cover" }}
        image={SailorSongPic}
        title="Sailor Song"
      />
      <CardContent sx={{ padding: 0 }}>
        <Typography gutterBottom variant="h5" component="div">
          {song.title}
        </Typography>
        <Typography gutterBottom variant="h6">
          {song.artist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SongPreviewCard;

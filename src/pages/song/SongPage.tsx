import { useLocation} from "react-router-dom";
import { Container, Typography, Box, Avatar } from "@mui/material";
import { SongProps } from "@/types/song";
import { useEffect, useState } from "react";
import ColorThief from "colorthief";

const SongPage = () => {
  
  const location = useLocation();
  const song = location.state as SongProps;
  const [bgColor, setBgColor] = useState<string>("rgba(0, 0, 0, 0.8)");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = song.image;
    img.onload = () => {
      const colorThief = new ColorThief();
      const dominantColor = colorThief.getColor(img);
      setBgColor(`rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.8)`);
    };
  }, [song.image]);

  return (
    <Container sx={{ padding: "20px", textAlign: "center" }}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        sx={{
          background: bgColor,
          padding: "1rem 5rem",
          margin: "1rem 10rem",
          borderRadius: "10px",
          transition: "background 0.3s ease",
        }}
      >
        <Box>
          <Avatar
            src={song.image}
            alt="Avatar"
            sx={{
              width: 150,
              height: 150,
              transition: "opacity 0.3s ease",
            }}
          />
        </Box>
        <Box
          justifyContent={"center"}
          alignItems={"flex-start"}
          display={"flex"}
          flexDirection={"column"}
          marginLeft={"2rem"}
        >
          <Typography fontSize={12} fontWeight={400}>
            Single
          </Typography>
          <Typography variant="h3" fontWeight={600}>
            {song.title}
          </Typography>
          <Typography fontSize={18} fontWeight={400}>
            {song.artist}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SongPage;

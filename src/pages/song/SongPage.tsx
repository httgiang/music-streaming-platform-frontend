import { useLocation } from "react-router-dom";
import { Container, Typography, Box, Tooltip, IconButton } from "@mui/material";
import { SongProps } from "@/types/song";
import { useEffect, useState } from "react";
import ColorThief from "colorthief";
import { PlayButtons } from "@/components/iconbuttons/IconButtons";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const SongPage = () => {
  const location = useLocation();
  const song = location.state as SongProps;
  const [bgColor, setBgGradient] = useState<string>("rgba(0, 0, 0, 0.8)");
  const [showMore, setShowMore] = useState(false);
  const maxLines = 5;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = song.image;
    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 2); 
      if (palette.length >= 2) {
        const [color1, color2] = palette;
        setBgGradient(
          `linear-gradient(135deg, rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.8), rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.8))`
        );
      }
    };
  }, [song.image]);

  return (
    <Container sx={{ padding: "10px 0", textAlign: "center"}}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        sx={{
          background: bgColor,
          padding: "1rem 2rem",
          borderRadius: "10px",
          transition: "background 0.3s ease",
          width: "100%", 
          maxWidth: "calc(100% - 20px)", 
        }}
      >
        <Box
          sx={{
            width: 150,
            height: 150,
            overflow: "hidden",
            borderRadius: "10px",
          }}
        >
          <img
            src={song.image}
            alt="Song"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
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
      <Box sx={{display:"flex", flexDirection:"column"}}></Box>
      <Box sx={{ marginTop: "2rem", display: "flex", justifyContent: "start", alignItems: "center", gap: "0.5rem" }}>
        <Box sx={{ transform: "scale(2.5)" }}>
          <PlayButtons onClick={() => { }} item={song as SongProps} />
        </Box>
        <Tooltip
          title={<span style={{ fontSize: "1em" }}>Add to favorite</span>}
          componentsProps={{
            tooltip: { sx: { backgroundColor: "gray" } },
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
            },
          }}
          placement="top"
        >
          <IconButton color="inherit">
            <AddCircleOutlineIcon sx={{ fontSize: "2rem" }} /> 
          </IconButton>
        </Tooltip>
      </Box>


<Box display={"flex"} flexDirection={"row"} gap={"12rem"} >

  <Box sx={{ marginTop: "1rem", display: "flex", flexDirection: "column", alignItems: "start", gap: "0.5rem" }}>
    <Typography variant="h6" sx={{ marginTop: "1rem", fontWeight: "bold", textAlign: "start" }}>
      Lyrics
    </Typography>
          {song.lyrics.split("\n").slice(0, showMore ? undefined : maxLines).map((line, index) => (
            <Typography key={index} variant="body2" sx={{ fontSize: "0.875rem", color: "text.secondary", maxWidth: "600px", textAlign: "start" }}>
              {line.replace(/ /g, '\u00A0')}
            </Typography>
          ))}
          {song.lyrics.split("\n").length > maxLines && (
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.75rem",
                color: "black",
                cursor: "pointer",
                textAlign: "start",
                fontWeight: "bold",
              }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "...Show more"}
            </Typography>
          )}
  
      </Box>

<Box>
  
</Box>
<Box
          display={"flex"}
          flexDirection={"row"}

        >
          <img
      
            src={song.artistImage}
            alt="Song"
            style={{
              width: 70,
            height: 70,
            overflow: "hidden",
            borderRadius: "50%",
            marginTop: "1rem",
              objectFit: "cover",
            }}
            
          />
            <Box display={"flex"} flexDirection={"column"} marginTop={"2rem"} marginLeft={"1rem"}  alignItems={"start"}>
        <Typography fontSize={14} >
            Artist
          </Typography>
          <Typography fontSize={14} fontWeight={'bold'}>
            {song.artist}
          </Typography>
        </Box>
        </Box>
      
</Box>

     
    </Container>
  );
};

export default SongPage;

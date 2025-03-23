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

      <Box sx={{ marginTop: "1rem", display: "flex", flexDirection: "column", alignItems: "start", gap: "0.5rem" }}>
        <Typography variant="h6" sx={{ marginTop: "1rem" }}>
          Lyrics
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.875rem", color: "text.secondary", maxWidth: "600px", textAlign: "start" }}>
        The snow glows white on the mountain tonight <br />
Not a footprint to be seen<br />
A kingdom of isolation<br />
And it looks like I'm the queen<br /><br />
The wind is howling like this swirling storm inside<br />
Couldn't keep it in, heaven knows I tried<br />
Don't let them in, don't let them see<br />
Be the good girl you always have to be<br />
Conceal, don't feel, don't let them know<br />
Well, now they know<br /><br />
Let it go, let it go<br />
Can't hold it back anymore<br />
Let it go, let it go<br />
Turn away and slam the door<br />
I don't care what they're going to say<br />
Let the storm rage on<br />
The cold never bothered me anyway<br /><br />
It's funny how some distance makes everything seem small<br />
And the fears that once controlled me can't get to me at all<br />
It's time to see what I can do<br />
To test the limits and break through<br />
No right, no wrong, no rules for me<br />
I'm free<br /><br />
Let it go, let it go<br />
I am one with the wind and sky<br />
Let it go, let it go<br />
You'll never see me cry<br />
Here I stand and here I stay<br />
Let the storm rage on<br /><br />
My power flurries through the air into the ground<br />
My soul is spiraling in frozen fractals all around<br />
And one thought crystallizes like an icy blast<br />
I'm never going back, the past is in the past<br /><br />
Let it go, let it go<br />
And I'll rise like the break of dawn<br />
Let it go, let it go<br />
That perfect girl is gone<br />
Here I stand in the light of day<br />
Let the storm rage on<br />
The cold never bothered me anyway
        </Typography>
      </Box>
    </Container>
  );
};

export default SongPage;

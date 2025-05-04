import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import { AlbumProps } from "@/types/album";
import ColorThief from "colorthief";

const AlbumPage: React.FC = () => {
  const location = useLocation();
  const album = location.state as AlbumProps;
  const coverImageUrl = album.coverImageUrl || album.image || "https://via.placeholder.com/150"; // Fallback for coverImageUrl
  console.log("Album Data:", album); // Debugging log

  const [bgColor, setBgGradient] = useState<string>("rgba(0, 0, 0, 0.8)");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!coverImageUrl) {
      console.error("coverImageUrl is missing:", album);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = coverImageUrl;
    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 2);
      if (palette.length >= 2) {
        const [color1, color2] = palette;
        setBgGradient(
          `linear-gradient(135deg, rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.7), rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.9))`
        );
      }
    };
    return () => {
      img.onload = null;
      img.onerror = null;
      img.src = "";
    };
  }, [coverImageUrl]);

  return (
    <Container sx={{ padding: "10px", textAlign: "center" }}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        sx={{
          background: bgColor,
          padding: "1rem ",
          borderRadius: "5px",
          transition: "background 0.3s ease",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box
          sx={{
            width: 270,
            height: 270,
            overflow: "hidden",
            borderRadius: "5px",
          }}
        >
          <img
            src={coverImageUrl}
            alt="Album"
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
          marginLeft={"3rem"}
        >
        <Typography fontSize="h6" color="white" fontWeight="bold">
            EP
          </Typography>
          <Typography variant="h2" color="white" fontWeight="bold">
            {album.name}
          </Typography>
          <Typography fontSize="h6" color="white" fontWeight="bold">
            {album.artist}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AlbumPage;

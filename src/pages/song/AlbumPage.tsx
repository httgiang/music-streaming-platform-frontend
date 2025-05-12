import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Typography, Box, Stack } from "@mui/material";
import { AlbumProps } from "@/types/album";
import ColorThief from "colorthief";
import { getSongsByAlbum } from "@/api/music/album-api";
import { SongProps } from "@/types/song";
import MusicCard from "@/components/music/MusicCard";

const AlbumPage: React.FC = () => {
  const location = useLocation();
  const [songs, setSongs] = useState<SongProps[]>([]);
  const { id } = useParams<{ id: string }>();
  const album = location.state as AlbumProps;
  const coverImageUrl = album.coverImageUrl 
  console.log("Album Data:", album); 

  const [bgColor, setBgGradient] = useState<string>("rgba(0, 0, 0, 0.8)");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      if (id) {
        try {
          const albumSongs = await getSongsByAlbum(id);
          console.log("Filtered API Response for getSongsByAlbum:", albumSongs); // Debugging log
          if (Array.isArray(albumSongs) && albumSongs.length > 0) {
            setSongs(albumSongs);
          } else {
            console.warn("No songs found for album ID:", id);
          }
        } catch (error) {
          console.error("Failed to fetch songs for album:", error);
        }
      } else {
        console.error("Album ID is missing.");
      }
    };
    fetchSongs();
  }, [id]);

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
  }, [album, coverImageUrl]);

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
      <Typography
        variant="h5"
        color="white"
        fontWeight="bold"
        sx={{ marginTop: 4, marginBottom: 2, textAlign: "left" }}
      >
        Songs in Album
      </Typography>
      <Stack spacing={2}>
        {        songs.map((song) => (
            <Box
                            key={song.id}
                            sx={{
                              "&:hover": {
                                backgroundColor: "#484848",
                                borderRadius: "8px",
                                transition: "background-color 0.3s ease",
                              },
                              padding: 1,
                            }}
                    
                          > <MusicCard
                          key={song.id}
                          song={{
                            coverImageUrl: song.coverImageUrl,
                            name: song.name,
                            artist: song.artist,
                            duration: song.duration ? song.duration.toString() : "N/A",
                          }}
                        />
                        </Box>
           
          ))}
      </Stack>
    </Container>
  );
};

export default AlbumPage;

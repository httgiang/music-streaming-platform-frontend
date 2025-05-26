import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Stack,
  Skeleton,
  CardMedia,
  Card,
  Fade,
  alpha,
} from "@mui/material";
import { MusicNote } from "@mui/icons-material";
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
  const coverImageUrl = album.coverImageUrl;

  console.log("Album Data:", album);

  const [bgColor, setBgGradient] = useState<string>("rgba(0, 0, 0, 0.8)");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setLoaded(true), 100);
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      if (id) {
        console.log("Fetching songs for album ID:", id); // Debugging log
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
    if (!coverImageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = coverImageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 3);
      if (palette.length >= 2) {
        const [color1, color2, color3] = palette;
        setBgGradient(
          `linear-gradient(135deg, 
              rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.4) 0%,
              rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.3) 50%,
              rgba(${color3?.[0] || color1[0]}, ${color3?.[1] || color1[1]}, ${
            color3?.[2] || color1[2]
          }, 0.2) 100%)`,
        );
      }
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [album, coverImageUrl]);

  return (
    <Container sx={{ padding: "10px", textAlign: "center" }}>
      {/* <Box
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
      </Typography> */}
      <Fade in={loaded} timeout={800}>
        <Card
          sx={{
            background: bgColor,
            backdropFilter: "blur(20px)",
            border: `1px solid ${alpha("#fff", 0.2)}`,
            borderRadius: 4,
            p: 4,
            overflow: "hidden",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: `0 20px 60px ${alpha("#000", 0.4)}`,
            },
          }}
        >
          <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
            <Box sx={{ flexShrink: 0, position: "relative" }}>
              {!album.coverImageUrl ? (
                <Skeleton
                  variant="rounded"
                  width={270}
                  height={270}
                  sx={{
                    borderRadius: 3,
                    bgcolor: alpha("#B39DDB", 0.1),
                  }}
                />
              ) : (
                <CardMedia
                  component="img"
                  image={album.coverImageUrl}
                  alt="Song cover"
                  sx={{
                    width: 280,
                    height: 280,
                    borderRadius: 3,
                    objectFit: "cover",
                    boxShadow: `0 15px 40px ${alpha("#000", 0.5)}`,
                  }}
                />
              )}
            </Box>
            <Stack spacing={2} sx={{ flex: 1, minWidth: 0, textAlign: "left" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MusicNote
                  sx={{ color: alpha("#fff", 0.7), fontSize: "1.2rem" }}
                />
                <Typography
                  variant="overline"
                  sx={{
                    color: alpha("#fff", 0.8),
                    fontWeight: 600,
                    letterSpacing: 2,
                  }}
                >
                  Album
                </Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  wordBreak: "break-word",
                  textShadow: `0 4px 20px ${alpha("#000", 0.5)}`,
                }}
              >
                {album.name}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: alpha("#fff", 0.9),
                  fontWeight: 500,
                  textShadow: `0 2px 10px ${alpha("#000", 0.3)}`,
                }}
              >
                {album.artist}
              </Typography>
            </Stack>
          </Box>
        </Card>
      </Fade>
      <Typography
        variant="h5"
        color="white"
        fontWeight="bold"
        sx={{ marginTop: 4, marginBottom: 2, textAlign: "left" }}
      >
        Songs in Album
      </Typography>
      <Stack spacing={2}>
        {songs.map((song) => (
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
          >
            {" "}
            <MusicCard
              key={song.id}
              song={{
                coverImageUrl: song.coverImageUrl,
                name: song.name,
                artist: song.artist,
                // duration: song.duration ? song.duration.toString() : "N/A",
                duration: song.duration ? song.duration : 140,
                lyric: song.lyric ? song.lyric : "",
                artistImage: song.artistImage ? song.artistImage : "",
                id: song.id,
              }}
            />
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default AlbumPage;

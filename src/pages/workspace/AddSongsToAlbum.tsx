import { Button, Box, Container, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { AlbumProps } from "@/types/album";
import { useState, useEffect } from "react";
import UploadMusicDialog from "./UploadMusicPage";
import ColorThief from "colorthief";
import { SongProps } from "@/types/song";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AlbumPublicSwitch from "@/components/music/AlbumPublicSwitch";
import EditableSongCard from "./EditableSongCard";
import { DndContext, useSensor } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { DragOverlay } from "@dnd-kit/core";
import {
  setSongsForAlbum,
  publicAlbum,
  getSongsByAlbum,
} from "@/api/music/album-api";

import {
  TouchSensor,
  KeyboardSensor,
  PointerSensor,
  useSensors,
} from "@dnd-kit/core";
import { useToast } from "@/contexts/ToastContext";
import theme from "@/theme/theme";

const AddSongsToAlbumPage = () => {
  const album = useLocation().state as AlbumProps;
  const coverImageUrl =
    album.coverImageUrl ||
    "https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg";

  const [bgColor, setBgGradient] = useState<string>("rgba(0, 0, 0, 0.8)");
  const [songs, setSongs] = useState<SongProps[]>([]);
  const [openUploadSong, setOpenUploadSong] = useState(false);
  const [isPublic, setIsPublic] = useState(album.isPublic);
  const [activeId, setActiveId] = useState<string | null>(null);
  const showToast = useToast();

  const getSongPos = (id: string) => songs.findIndex((song) => song.id === id);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragSongEnd = (event: any) => {
    const { active, over } = event;
    if (active.id == over.id) return;
    setSongs((songs) => {
      const originalPos = getSongPos(active.id);
      const newPos = getSongPos(over.id);
      return arrayMove(songs, originalPos, newPos);
    });
    setActiveId(null);
  };

  const sensor = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const handleDeleteSong = (songId: string) => {
    setSongs((prev) => prev.filter((song) => song.id !== songId));
  };

  const saveSongsToAlbum = async () => {
    const songIds = songs.map((song) => song.id);
    const albumId = album.id;
    const response = await setSongsForAlbum(albumId, songIds);
    return response;
  };

  const publishAlbum = async () => {
    const albumId = album.id;
    const response = await publicAlbum(albumId);
    return response;
  };

  const getCurrentAlbumSongs = async () => {
    try {
      const albumSongs = await getSongsByAlbum(album.id);
      if (Array.isArray(albumSongs) && albumSongs.length > 0) {
        setSongs(albumSongs);
      }
    } catch (error) {
      console.error("Error fetching album songs:", error);
    }
  };

  useEffect(() => {
    getCurrentAlbumSongs();
  }, [album.id]);

  const handleSaveChanges = async () => {
    let publishAlbumRes = null;
    let saveSongsRes = null;
    if (isPublic) {
      publishAlbumRes = await publishAlbum();
      if (publishAlbumRes?.status === 200) {
        showToast("Album updated successfully", "success");
      } else {
        showToast("Failed to update album", "error");
      }
    }
    saveSongsRes = await saveSongsToAlbum();
    if (saveSongsRes?.status === 200) {
      showToast("Album updated successfully", "success");
    } else {
      showToast("Failed to update album", "error");
    }
  };
  useEffect(() => {
    if (!coverImageUrl) {
      console.error("coverImageUrl is missing:", album);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = album.coverImageUrl;
    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 2);
      if (palette.length >= 2) {
        const [color1, color2] = palette;
        setBgGradient(
          `linear-gradient(135deg, rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.7), rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.9))`,
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
            ALBUM
          </Typography>
          <Typography variant="h3" color="white" fontWeight="bold">
            {album.name}
          </Typography>
          <Typography fontSize="h6" color="white" fontWeight="bold">
            {album.artist}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 2,
          gap: 2,
        }}
      >
        <Button
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 2,
            color: "white",
          }}
          onClick={() => {
            setOpenUploadSong(true);
          }}
        >
          <FileUploadOutlinedIcon sx={{ width: 20, height: 20 }} />
          <Typography fontSize={14}>Upload songs</Typography>
        </Button>
        <UploadMusicDialog
          open={openUploadSong}
          onClose={() => setOpenUploadSong(false)}
          onMusicUploaded={(newSong: SongProps) => {
            setSongs((prev) => [...prev, newSong]);
          }}
        />
        <Button
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 2,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography fontSize={14} color="textPrimary">
              Public
            </Typography>
            <AlbumPublicSwitch
              checked={isPublic}
              onChange={(e) => {
                setIsPublic(e.target.checked);
              }}
            />
            <Typography fontSize={14} color="textPrimary">
              Private
            </Typography>
          </Stack>
        </Button>
      </Box>
      <Typography
        variant="h5"
        color="white"
        fontWeight="bold"
        sx={{ marginTop: 4, marginBottom: 2, textAlign: "left" }}
      >
        Songs in Album
      </Typography>

      <DndContext
        sensors={sensor}
        onDragEnd={handleDragSongEnd}
        onDragStart={handleDragStart}
      >
        {songs.length > 0 ? (
          <Stack spacing={2}>
            {songs.map((song) => (
              <EditableSongCard
                key={song.id}
                song={{
                  id: song.id,
                  duration: song.duration,
                  coverImageUrl: song.coverImageUrl,
                  name: song.name,
                  artist: song.artist,
                  lyric: song.lyric,
                  likesCount: song.likesCount,
                  artistImage: "",
                }}
                handleDelete={() => handleDeleteSong(song.id)}
              />
            ))}
          </Stack>
        ) : (
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{ marginTop: 2 }}
          >
            No songs added to this album yet.
          </Typography>
        )}

        <DragOverlay>
          {activeId ? (
            <EditableSongCard
              song={songs.find((s) => s.id === activeId)!}
              handleDelete={handleDeleteSong}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <Box display="flex" justifyContent={"flex-end"}>
        <Button
          variant="contained"
          onClick={() => {
            handleSaveChanges();
          }}
          sx={{ marginTop: 2, background: theme.palette.secondary.main }}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};
export default AddSongsToAlbumPage;

import { Card, Box, Typography } from "@mui/material";
import { SongProps } from "@/types/song";
import { ArtistProps } from "@/types/artist";
import { PlayButtons } from "@/components/iconbuttons/IconButtons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { playSong } from "@/features/music/playerSlice";
import { RootState } from "@/store";
import LogInSuggestionDialog from "../home/LogInSuggestionDialog";
import { AlbumProps } from "@/types/album";

export interface MusicPreviewCardProps {
  type: "song" | "artist" | "album";
  item: SongProps | ArtistProps | AlbumProps;
}

const MusicPreviewCard: React.FC<MusicPreviewCardProps> = ({ item, type }) => {
  const [isPlayButtonVisible, setPlayButtonVisible] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [loadedImage, setLoadedImage] = useState(false);

  const [showLogInDialog, setShowLogInDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setPlayButtonVisible(true);
  };

  const handleMouseLeave = () => {
    setPlayButtonVisible(false);
  };

  const handlePlayButtonClick = () => {
    if (!isAuthenticated) {
      setShowLogInDialog(true);
      return;
    }

    if (type === "song") {
      dispatch(playSong(item as SongProps));
    }
  };
  const handleCardClick = () => {
    if (type === "song") {
      navigate(`/song/${(item as SongProps).id}`, { state: item });
    } else if (type === "artist") {
      navigate(`/artist/${(item as ArtistProps).id}`, { state: item });
    } else if (type === "album") {
      navigate(`/album/${(item as AlbumProps).id}`, { state: item }); 
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingX: 3,
          paddingY: 2,
          width: 150,
          height: 200,
          backgroundColor: "rgba(255, 255, 255, 0.01)",
          backdropFilter: "blur(12px)",

          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.05)",
            transition: "transform 0.3s ease-in-out",
          },
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        <Box
          sx={{
            height: 150,
            width: 150,
            backgroundImage: `url(${
              type === "song"
                ? (item as SongProps).coverImageUrl
                : (item as ArtistProps).coverImageUrl
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: type === "artist" ? "50%" : "0%",
            filter: loadedImage ? "none" : "blur(10px)",
            transition: "filter 0.3s ease-out",
          }}
          component="div"
        >
          <img
            src={
              type === "song"
                ? (item as SongProps).coverImageUrl
                : (item as ArtistProps).coverImageUrl
            }
            alt={item.name}
            style={{ display: "none" }}
            onLoad={() => setLoadedImage(true)}
          />
        </Box>

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
              ? (item as SongProps).name
              : type === "artist"
              ? (item as ArtistProps).name
              : item.name }
          </Typography>
          <Typography fontSize={14}>
            {type === "song"
              ? (item as SongProps).artist
              : type === "artist"
              ? "Artist"
              : (item as AlbumProps).artist }
          </Typography>
          {isPlayButtonVisible && (
            <Box
              sx={{
                position: "absolute",
                right: 20,
                transform: "scale(2.0)",
              }}
            >
              {type === "song" && (
                <PlayButtons onClick={handlePlayButtonClick} />
              )}
            </Box>
          )}
        </Box>
      </Card>
      <LogInSuggestionDialog
        open={showLogInDialog}
        onClose={() => setShowLogInDialog(false)}
      />
    </>
  );
};

export default MusicPreviewCard;

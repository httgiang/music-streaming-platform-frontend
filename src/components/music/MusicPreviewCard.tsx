import { Card, Box, Typography, Fade, Skeleton } from "@mui/material";
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
    setPlayButtonVisible(false);
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
          justifyContent: "center",
          alignItems: "center",
          p: 0.5,
          width: 160,
          height: 200,
          // backgroundColor: "rgba(255, 255, 255, 0.01)",
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
            position: "relative",
            height: 140,
            width: 140,
            borderRadius: type === "artist" ? "50%" : "8px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            opacity: loadedImage ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {item ? (
            <>
              {" "}
              <img
                src={
                  type === "song"
                    ? (item as SongProps).coverImageUrl
                    : type === "album"
                    ? (item as AlbumProps).coverImageUrl
                    : (item as ArtistProps).coverImageUrl
                }
                alt={item.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  overflow: "hidden",
                  display: "block",
                }}
                onLoad={() => setLoadedImage(true)}
              />
              <Fade in={isPlayButtonVisible}>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    zIndex: 2,
                    borderRadius: "50%",
                    transform: "scale(1.3)",
                    display: type === "song" ? "block" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <PlayButtons onClick={handlePlayButtonClick} />
                </Box>
              </Fade>
            </>
          ) : (
            <Skeleton
              variant="rectangular"
              width={140}
              height={140}
              animation="wave"
              sx={{
                borderRadius: type === "artist" ? "50%" : "8px",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 1,
            textAlign: "left",
            paddingLeft: 1,
            alignSelf: "flex-start",
          }}
        >
          <Typography fontSize={14} fontWeight={600}>
            {type === "song"
              ? (item as SongProps).name
              : type === "artist"
              ? (item as ArtistProps).name
              : item.name}
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            {type === "song"
              ? (item as SongProps).artist
              : type === "artist"
              ? "Artist"
              : (item as AlbumProps).artist}
          </Typography>
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

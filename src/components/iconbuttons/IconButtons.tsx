import { IconButton } from "@mui/material";
import { NavigateNext, NavigateBefore, PlayCircle } from "@mui/icons-material";
import { SongProps } from "@/types/song";


interface SliderButtonProps {
  onClick: () => void;
    item: SongProps ;
}

export const NextButton: React.FC<SliderButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: 0,
        top: "50%",
        zIndex: 1,
        color: "white",
        backgroundColor: "rgba(0,0,0, 0.5)",
      }}
    >
      <NavigateNext />
    </IconButton>
  );
};

export const PrevButton: React.FC<SliderButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: 0,
        top: "50%",
        zIndex: 1,
        color: "white",
        backgroundColor: "rgba(0,0,0, 0.5)",
      }}
    >
      <NavigateBefore />
    </IconButton>
  );
};

export const PlayButtons: React.FC<SliderButtonProps> = ({ onClick }) => {

  const handlePlayButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();  
  };

  return (
    <IconButton onClick={(event) => { handlePlayButtonClick(event); onClick(); }}>
      <PlayCircle sx={{ color: "red" }} />
    </IconButton>
  );
};

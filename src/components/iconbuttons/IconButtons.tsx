import { IconButton } from "@mui/material";
import { NavigateNext, NavigateBefore, PlayCircle } from "@mui/icons-material";

interface SliderButtonProps {
  onClick: () => void;
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
  return (
    <IconButton onClick={onClick}>
      <PlayCircle sx={{ color: "red" }} />
    </IconButton>
  );
};

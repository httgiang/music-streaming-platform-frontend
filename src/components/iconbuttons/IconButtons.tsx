import { IconButton } from "@mui/material";
import {
  NavigateNext,
  NavigateBefore,
  PlayArrow,
} from "@mui/icons-material";
import theme from "@/theme/theme";

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
  const handlePlayButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <IconButton
      onClick={(event) => {
        handlePlayButtonClick(event);
        onClick();
      }}
    >
      <PlayArrow
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: "white",
          borderRadius: "50%",
        }}
      />
    </IconButton>
  );
};

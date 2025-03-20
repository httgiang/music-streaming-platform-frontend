import React from "react";
import {
  IconButton,
  Slider,
  Typography,
  Box,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  VolumeDownRounded,
} from "@mui/icons-material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { playSong, pauseSong } from "@/features/music/playerSlice";

const PlaybackControl = () => {
  const currentSong = useSelector(
    (state: RootState) => state.player.currentSong,
  );

  const dispatch = useDispatch();
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);

  const [position, setPosition] = React.useState(32);

  if (!currentSong) return null;

  const togglePlayPause = () => {
    if (isPlaying) {
      dispatch(pauseSong());
    } else {
      dispatch(playSong(currentSong));
    }
  };

  const duration = 2311; //dummy

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      height="55px"
      width="100%"
      bgcolor="#1e1e1e"
      color="white"
      p={0.8}
      borderRadius={2}
      boxShadow={3}
      position="fixed"
      bottom={0}
      left={0}
      zIndex={9999}
    >
      <Box flex={3} display="flex" alignItems="center" gap={1} ml={1}>
        <img
          src={currentSong.image}
          alt="Album Cover"
          style={{ width: 40, height: 40, borderRadius: 5 }}
        />
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {currentSong.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="gray"
            fontSize="small"
            marginRight="15px"
          >
            {currentSong.artist}
          </Typography>
        </Box>

        <Box>
          <Tooltip
            title={<span style={{ fontSize: "16px" }}>Add to favorite</span>}
            componentsProps={{
              tooltip: { sx: { backgroundColor: "gray" } },
              popper: {
                modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
              },
            }}
            placement="top"
          >
            <IconButton color="inherit">
              <AddCircleOutlineIcon sx={{ height: "18px" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box flex={7} display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton color="inherit" size="small">
            <SkipPrevious />
          </IconButton>
          <IconButton color="inherit" onClick={togglePlayPause} size="small">
            {!isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton color="inherit" size="small">
            <SkipNext />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center" width="40%" mr={2}>
          <Typography variant="body2">{formatTime(position)}</Typography>
          <Slider
            value={position}
            min={0}
            step={1}
            max={duration}
            onChange={(_, value) => setPosition(value as number)}
            sx={{ mx: 2, flexGrow: 1, color: "white" }}
            size="small"
          />
          <Typography variant="body2">
            {formatTime(duration - position)}
          </Typography>
        </Box>
      </Box>

      <Box
        flex={3}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        gap={1}
        mr={3}
      >
        <Box sx={{ width: 150 }}>
          <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
            <IconButton color="inherit" size="small">
              <VolumeDownRounded />
            </IconButton>
            <Slider
              size="small"
              defaultValue={70}
              aria-label="Small"
              valueLabelDisplay="auto"
              color="secondary"
              sx={() => ({
                color: "white",
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  width: 15,
                  height: 15,
                  backgroundColor: "#fff",
                  "&:hover, &.Mui-focusVisible, &.Mui-active": {
                    boxShadow: "none",
                  },
                },
              })}
            />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default PlaybackControl;

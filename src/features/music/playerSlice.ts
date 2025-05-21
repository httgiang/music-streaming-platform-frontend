import { createSlice } from "@reduxjs/toolkit";
import { SongProps } from "@/types/song";

interface PlayerState {
  currentSong: SongProps | null;
  isPlaying: boolean;
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    pauseSong: (state) => {
      state.isPlaying = false;
    },
    stopSong: (state) => {
      state.currentSong = null;
      state.isPlaying = false;
    },
  },
});

export const { playSong, pauseSong, stopSong } = playerSlice.actions;
export default playerSlice.reducer;

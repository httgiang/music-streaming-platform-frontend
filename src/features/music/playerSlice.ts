import { createSlice } from "@reduxjs/toolkit";
import { SongProps } from "@/types/song";

interface PlayerState {
  currentSong: SongProps | null;
  recentlyPlayedSongs?: SongProps[];
  isPlaying: boolean;
}

const initialState: PlayerState = {
  currentSong: null,
  recentlyPlayedSongs: JSON.parse(
    localStorage.getItem("recentlyPlayedSongs") || "[]",
  ) as SongProps[],
  isPlaying: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playSong: (state, action) => {
      const newSong = action.payload;
      state.currentSong = newSong;
      state.isPlaying = true;
      state.recentlyPlayedSongs = [
        newSong,
        ...(state.recentlyPlayedSongs ?? []).filter(
          (song) => song.id !== newSong.id,
        ),
      ].slice(0, 5);
      localStorage.setItem(
        "recentlyPlayedSongs",
        JSON.stringify(state.recentlyPlayedSongs),
      );
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

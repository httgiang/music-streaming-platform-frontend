import { createSlice } from "@reduxjs/toolkit";
import { AlbumProps } from "@/types/album";

interface AlbumState {
  currentAlbum: AlbumProps | null;
}

const initialState: AlbumState = {
  currentAlbum: null,
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    setCurrentAlbum: (state, action) => {
      state.currentAlbum = action.payload;
    },
    clearCurrentAlbum: (state) => {
      state.currentAlbum = null;
    },
  },
});

export const { setCurrentAlbum, clearCurrentAlbum } = albumSlice.actions;
export default albumSlice.reducer;

import { Lyrics } from "@mui/icons-material";
import axios from "axios";

export const fetchSongs = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/songs/many",
      {
        withCredentials: true,
      },
    );
    const songs = Array.isArray(response?.data?.data)
      ? response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          lyric: item.lyric,
          coverImageUrl: item.coverImageUrl,
          duration: 0,
          artist: item.user.username,
          artistImage: item.user.userAvatar,
        }))
      : [];

    return songs;
  } catch (error) {
    console.error("Fetch songs failed: ", error);
    throw error;
  }
};

export const getSongById = async (id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/songs/${id}`,
    );
    const song = response.data?.data.song;
    return song;
  } catch (error) {
    console.error("Fetch song by ID failed: ", error);
    throw error;
  }
};

export const searchSongsOrArtists = async (query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/songs/many?name=${encodeURIComponent(query)}`,
    );
    const results = response.data?.data || [];
    return results.map((item: any) => ({
      id: item.id,
      name: item.name,
      type: "song", 
      artist: item.user.username,
      coverImageUrl: item.coverImageUrl,
      lyric: item.lyric, 
    }));
  } catch (error) {
    console.error("Search failed: ", error);
    throw error;
  }
};

export const searchAlbums = async (query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/albums/many?name=${encodeURIComponent(query)}`,
    );
    const results = response.data?.data || [];
    return results.map((item: any) => ({
      id: item.id,
      name: item.name,
      coverImageUrl: item.coverImageUrl,
      artist: item.user.username,
      isPublic: item.isPublic,
      type: "album",
    }));
  } catch (error) {
    console.error("Search albums failed: ", error);
    throw error;
  }
};
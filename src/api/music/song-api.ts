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
          id: item.song.id,
          name: item.song.name,
          lyrics: item.song.lyric,
          coverImageUrl: item.song.coverImageUrl,
          duration: 0,
          artist: item.song.user.username,
          artistImage: item.song.user.userAvatar,
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
      id: item.song.id,
      name: item.song.name,
      type: "song", 
      coverImageUrl: item.song.coverImageUrl,
      description: item.song.lyric || "No description available",
    }));
  } catch (error) {
    console.error("Search failed: ", error);
    throw error;
  }
};
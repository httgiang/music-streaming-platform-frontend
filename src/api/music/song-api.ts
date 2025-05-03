import api from "../axios-api";

export const fetchSongs = async () => {
  try {
    const response = await api.get("/songs/many", {
      withCredentials: true,
    });
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
    const response = await api.get(`/songs/${id}`);
    const song = response.data?.data.song;
    return song;
  } catch (error) {
    console.error("Fetch song by ID failed: ", error);
    throw error;
  }
};

export const streamSong = async (id: string) => {
  try {
    const response = await api.get(`/songs/stream/${id}`, {
      headers: {
        Range: "bytes=0-499999",
      },
      responseType: "blob",
    });
    const blob = response.data;
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    audio.controls = true;
    audio.play();
  } catch (error) {
    console.error("Stream song failed: ", error);
    throw error;
  }
};

export const uploadSong = async (songData: any) => {
  try {
    const response = await api.post("/users/songs", songData, {
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    // Server responded with a status other than 2xx
    console.error("Server Error Response:", error.response?.data);
    throw error;
  }
};

export const searchSongsOrArtists = async (query: string) => {
  try {
    const response = await api.get(
      `/songs/many?name=${encodeURIComponent(query)}`,
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

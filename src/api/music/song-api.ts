import api from "../axios-api";

export const fetchSongs = async () => {
  try {
    const response = await api.get("/songs/many", {
      withCredentials: true,
    });
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
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: any) {
    console.error("Upload song failed: ", error);
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

export const getSongsByArtist = async (
  artistId: string,
  limit: number = 50,
) => {
  try {
    const response = await api.get(
      `/songs/many?artistId=${encodeURIComponent(artistId)}&limit=${limit}`,
    );
    console.log("getSongsByArtist response:", response.data);
    const results = response.data?.data || [];
    const filteredResults = results.filter(
      (item: any) => item.user.username === artistId,
    );
    if (filteredResults.length === 0) {
      console.warn("No songs found for artistId (username):", artistId);
    }
    return filteredResults.map((item: any) => ({
      id: item.id,
      name: item.name,
      lyric: item.lyric,
      coverImageUrl: item.coverImageUrl,
      duration: item.duration || 0,
      artist: item.user.username,
      artistImage: item.user.userAvatar,
    }));
  } catch (error) {
    console.error("Fetch songs by artist failed: ", error);
    throw error;
  }
};

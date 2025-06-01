import api from "../axios-api";

export const fetchMostLikedSongs = async () => {
  try {
    const response = await api.get("/feeds/most-liked-songs?userProfiles=true");
    console.log(response.data);
    const mostLikedSongs = Array.isArray(response?.data?.data)
      ? response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          lyric: item.lyric,
          coverImageUrl: item.coverImageUrl,
          duration: 0,
          likesCount: item.likesCount || 0,
          artist: item.user.userProfile?.name,
          artistImage: item.user.userAvatar,
        }))
      : [];
    return mostLikedSongs;
  } catch (error) {
    console.error("Fetch most liked songs failed: ", error);
    throw error;
  }
};

export const fetchRecentlyLikedSongs = async (limit: number) => {
  try {
    const response = await api.get(
      `/feeds/recently-liked-songs?userProfiles=true&limit=${limit}`,
    );

    const recentlyLikedSongs = Array.isArray(response?.data?.data)
      ? response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          lyric: item.lyric,
          coverImageUrl: item.coverImageUrl,
          duration: 0,
          likesCount: item.likesCount || 0,
          artist: item.user.userProfile?.name,
          artistImage: item.user.userAvatar,
        }))
      : [];
    return recentlyLikedSongs;
  } catch (error) {
    console.error("Fetch recently liked songs failed: ", error);
    throw error;
  }
};
export const fetchSongs = async () => {
  try {
    const response = await api.get("/songs/many?userProfiles=true", {
      withCredentials: true,
    });
    const songs = Array.isArray(response?.data?.data)
      ? response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          lyric: item.lyric,
          coverImageUrl: item.coverImageUrl,
          duration: 0,
          likesCount: item.likesCount || 0,
          artist: item.user.userProfile?.name,
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

export const streamSong = async (id: string, start: number, end: number) => {
  try {
    const response = await api.get(`/songs/stream/${id}`, {
      headers: {
        Range: `bytes=${start}-${end}`,
      },
      responseType: "arraybuffer",
    });
    return response.data as ArrayBuffer;
  } catch (error) {
    console.error("Stream song failed: ", error);
    throw error;
  }
};

export const uploadSong = async (songData: any) => {
  try {
    const response = await api.post("/songs", songData, {
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
    console.log("Search query: ", query);

    const response = await api.get(
      `/songs/many?name=${encodeURIComponent(query)}&userProfiles=true`,
    );
    const results = response.data?.data || [];
    console.log("Search results: ", results);
    return results.map((item: any) => ({
      id: item.id,
      name: item.name,
      type: "song",
      artist: item.user.userProfile?.name || item.user.username,
      artistImage: item.user.userProfile?.avatarImageUrl || item.user.userAvatar,
      userId: item.user.id,
      coverImageUrl: item.coverImageUrl,
      lyric: item.lyric,
    }));
  } catch (error) {
    console.error("Search failed: ", error);
    throw error;
  }
};

export const getSongsByArtist = async (artistId: string) => {
  try {
    const response = await api.get(
      `/songs/many?userId=${encodeURIComponent(artistId)}&userProfiles=true`,
    );
    const songs = Array.isArray(response?.data?.data)
      ? response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          lyric: item.lyric,
          coverImageUrl: item.coverImageUrl,
          duration: item.duration || 0,
          likesCount: item.likesCount || 0,
          artist: item.user.username,
          artistImage: item.user.userAvatar,
        }))
      : [];
    return songs;
  } catch (error) {
    console.error("Fetch songs by artist failed: ", error);
    throw error;
  }
};

export const likeSong = async (songId: string) => {
  try {
    const response = await api.post(
      `/songs/${songId}/like`,
      {},
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("Like song failed: ", error);
    throw error;
  }
};

export const unlikeSong = async (songId: string) => {
  try {
    const response = await api.post(
      `/songs/${songId}/unlike`,
      {},
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("Like song failed: ", error);
    throw error;
  }
};

export const getSongLikeStatus = async (songId: string) => {
  try {
    const response = await api.get(`/songs/${songId}/like-status`, {
      withCredentials: true,
    });
    return response.data.data.likeStatus;
  } catch (error) {
    console.error("Get song like status failed: ", error);
    throw error;
  }
};

export const getLikedSongs = async () => {
  try {
    const response = await api.get("/users/me/liked-songs", {
      withCredentials: true,
    });

    const songs = Array.isArray(response?.data?.data)
      ? response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          lyric: item.lyric || "",
          coverImageUrl: item.coverImageUrl,
          duration: 0,
          likesCount: item.likesCount || 0,
          artist: "Unknown Artist",
          artistImage: item.user?.userAvatar || "",
        }))
      : [];

    return songs;
  } catch (error) {
    console.error("Fetch liked songs failed: ", error);
    throw error;
  }
};

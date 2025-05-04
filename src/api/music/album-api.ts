import api from "../axios-api";

export const createAlbum = async (albumData: any) => {
  try {
    const response = await api.post("/users/albums", albumData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error: any) {
    console.error("Create album failed: ", error);
    throw error;
  }
};

export const getSongsByAlbum = async (albumId: string, limit: number = 50) => {
  try {
    const response = await api.get(
      `/songs/many?albumId=${encodeURIComponent(albumId)}&limit=${limit}`,
    );
    const results = response.data?.data || [];
    return results
      .filter((item: any) => {
        return item.albumId === albumId; 
      })
      .map((item: any) => ({
        id: item.id,
        name: item.name,
        lyric: item.lyric,
        coverImageUrl: item.coverImageUrl,
        duration: item.duration || 0,
        artist: item.user.username,
        artistImage: item.user.userAvatar,
      }));
  } catch (error) {
    console.error("Fetch songs by album failed: ", error);
    throw error;
  }
};

export const searchAlbums = async (query: string) => {
  try {
    const response = await api.get(
      `/albums/many?name=${encodeURIComponent(query)}`,
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
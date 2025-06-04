import api from "../axios-api";

export const createAlbum = async (albumData: any) => {
  try {
    const response = await api.post("/albums", albumData, {
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

export const getAlbumById = async (albumId: string) => {
  try {
    const response = await api.get(`/albums/${albumId}`, {
      withCredentials: true,
    });
    const album = response.data?.data.album;
    return album;
  } catch (error: any) {
    console.error("Fetch album by ID failed: ", error);
    throw error;
  }
};

export const getSongsByAlbum = async (albumId: string) => {
  try {
    const response = await api.get(
      `/albums/${encodeURIComponent(albumId)}?songs=true&userProfile=true`,
    );
    const songs = response.data?.data.album?.songs || [];
    const artist =
      response.data?.data.album?.user?.userProfile?.name ||
      response.data?.data.album?.user?.username ||
      "Unknown Artist";
    const artistImage =
      response.data?.data.album?.user?.userProfile?.avatarImageUrl || "";

    return songs
      .filter((item: any) => {
        return item.albumId === albumId;
      })
      .map((item: any) => ({
        id: item.id,
        name: item.name,
        lyric: item.lyric,
        coverImageUrl: item.coverImageUrl,
        duration: item.duration || 0,
        artist: artist,
        artistImage: artistImage,
      }));
  } catch (error) {
    console.error("Fetch songs by album failed: ", error);
    throw error;
  }
};

export const fetchAlbums = async (limit: number) => {
  try {
    const response = await api.get(
      `/albums/many?limit=${limit}&userProfiles=true`,
      {
        withCredentials: true,
      },
    );

    const albums = Array.isArray(response?.data?.data)
      ? response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          coverImageUrl: item.coverImageUrl,
          artist:
            item.user?.userProfile?.name ||
            item.user?.username ||
            "Unknown Artist",
          artistImage: item.user?.userProfile?.avatarImageUrl || "",
          isPublic: item.isPublic,
          likesCount: item.likesCount,
        }))
      : [];

    return albums;
  } catch (error) {
    console.error("Fetch albums failed: ", error);
    throw error;
  }
};

export const searchAlbums = async (query?: string, userId?: string) => {
  try {
    const params = new URLSearchParams();
    params.append("userProfiles", "true");
    if (query) params.append("name", query);
    if (userId) params.append("userId", userId);
    const url = `/albums/many?${params.toString()}`;

    const response = await api.get(url);
    const results = response.data?.data || [];

    return results.map((item: any) => ({
      id: item.id,
      name: item.name,
      coverImageUrl: item.coverImageUrl,
      artist:
        item.user?.userProfile?.name || item.user?.username || "Unknown Artist",
      artistImage: item.user?.userProfile?.avatarImageUrl || "",
      isPublic: item.isPublic,
      type: "album",
    }));
  } catch (error) {
    console.error("Search albums failed: ", error);
    throw error;
  }
};

export const fetchAllAlbums = async () => {
  try {
    const response = await api.get("/albums/many?userProfiles=true");
    const albums = Array.isArray(response?.data?.data)
      ? response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          coverImageUrl: item.coverImageUrl,
          artist:
            item.user?.userProfile?.name ||
            item.user?.username ||
            "Unknown Artist",
          artistImage: item.user?.userProfile?.avatarImageUrl || "",
          isPublic: item.isPublic,
        }))
      : [];
    return albums;
  } catch (error) {
    console.error("Fetch all albums failed: ", error);
    throw error;
  }
};

export const setSongsForAlbum = async (albumId: string, songIds: string[]) => {
  try {
    const response = await api.put(`/albums/${albumId}/songs/set`, songIds);
    return response;
  } catch (error: any) {
    console.error("Set songs for album failed: ", error);
    throw error;
  }
};

export const appendSongsToAlbum = async (
  albumId: string,
  songIds: string[],
) => {
  try {
    const response = await api.patch(
      `/albums/${albumId}/songs/append`,
      songIds,
    );
    return response;
  } catch (error: any) {
    console.error("Set songs for album failed: ", error);
    throw error;
  }
};

export const insertSongToAnIndex = async (
  albumId: string,
  songId: string,
  index: number,
) => {
  try {
    const response = await api.patch(
      `/albums/${albumId}/songs/insert/${songId}`,
      {
        index,
      },
    );
    return response;
  } catch (error: any) {
    console.error("Set songs for album failed: ", error);
    throw error;
  }
};

export const publicAlbum = async (albumId: string) => {
  try {
    const response = await api.patch(`/albums/${albumId}/public`);
    return response;
  } catch (error: any) {
    console.error("Set songs for album failed: ", error);
    throw error;
  }
};

export const likeAlbum = async (albumId: string) => {
  try {
    const response = await api.post(
      `/albums/${albumId}/like`,
      {},
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("Like album failed: ", error);
    throw error;
  }
};

export const unlikeAlbum = async (albumId: string) => {
  try {
    const response = await api.post(
      `/albums/${albumId}/unlike`,
      {},
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.error("Unlike album failed: ", error);
    throw error;
  }
};

export const getAlbumLikeStatus = async (albumId: string) => {
  try {
    const response = await api.get(`/albums/${albumId}/like-status`, {
      withCredentials: true,
    });
    return response.data.data.likeStatus;
  } catch (error) {
    console.error("Get album like status failed: ", error);
    throw error;
  }
};

export const getLikedAlbums = async () => {
  try {
    const response = await api.get("/users/me/liked-albums?userProfiles=true", {
      withCredentials: true,
    });

    const albums = Array.isArray(response?.data?.data)
      ? response.data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          coverImageUrl: item.coverImageUrl,
          artist:
            item.user?.userProfile?.name ||
            item.user?.username ||
            "Unknown Artist",
          artistImage: item.user?.userProfile?.avatarImageUrl || "",
          isPublic: item.isPublic,
        }))
      : [];

    return albums;
  } catch (error) {
    console.error("Fetch liked albums failed: ", error);
    throw error;
  }
};

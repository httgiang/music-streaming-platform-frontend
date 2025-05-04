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
    throw error;
  }
};

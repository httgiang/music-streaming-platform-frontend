import axios from "axios";

export const fetchSongs = async () => {
  try {
    const response = await axios.get("/songs/many");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Fetch songs failed: ", error);
    throw error;
  }
};

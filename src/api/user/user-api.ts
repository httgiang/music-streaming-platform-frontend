import axios from "axios";


export const fetchUserProfile = async (id: string) => {
  try {
    const response = await axios.get(`/users/${id}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile", error);
    throw error;
  }
};

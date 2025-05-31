import api from "../axios-api";

export const fetchUserProfile = async (id: string) => {
  try {
    const response = await api.get(`/users/${id}`);
    console.log("API Response:", response.data);
    const profile = response.data.data.user.userProfile;
    if (!profile) {
      throw new Error("Profile not found");
    }
    return profile;
  } catch (error) {
    console.error("Failed to fetch profile", error);
    throw error;
  }
};

export const updateUserProfile = async (profileData: any) => {
  try {
    const response = await api.patch(`/users/profiles`, profileData);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update profile", error);
    throw error;
  }
};

export const updateUserProfileAvatar = async (avatar: File) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await api.put(`/users/me/profiles/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to update profile avatar", error);
    throw error;
  }
};

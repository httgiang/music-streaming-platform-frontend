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

export const fetchManyUsers = async () => {
  try {
    // Use GET /users/many endpoint with a large limit to get artist users
    const response = await api.get(`/users/many?limit=20`);
    console.log("API Response for multiple users:", response.data);    if (!response.data.data || !Array.isArray(response.data.data)) {
      console.error("Invalid API response format for users");
      return [];
    }
    // Import default avatar - using Beatles image as default
    const defaultAvatarUrl = new URL('../../assets/images/default-avatar.png', import.meta.url).href;

    return response.data.data.map((user: any) => ({
      id: user.id,
      username: user.username,
      userProfile: user.userProfile
        ? {
            name: user.userProfile.name,
            avatarImageUrl: user.userProfile?.avatarImageUrl || defaultAvatarUrl,
          }
        : {
            name: user.username,
            avatarImageUrl: defaultAvatarUrl,
          },
    }));
  } catch (error) {
    console.error("Failed to fetch multiple users", error);
    throw error;
  }
};

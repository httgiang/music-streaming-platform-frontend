import axios from "axios";

export const signUp = async (signUpData: any) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      signUpData,
    );
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Sign up failed: ", error);
  }
};

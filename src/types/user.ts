import * as Yup from "yup";

export interface UserProfileProps {
  name: string;
  dob: Date;
  gender: string;
}

export const initialUserProfileValues: UserProfileProps = {
  name: "",
  dob: new Date(),
  gender: "",
};

export const userProfileValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username cannot be changed"),
  name: Yup.string().required("This name will appear on your profile"),
  dob: Yup.date(),
  gender: Yup.string(),
});

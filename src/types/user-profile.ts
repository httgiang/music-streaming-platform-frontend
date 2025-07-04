import * as Yup from "yup";
import { phoneRegex } from "./auth/regex";

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isVerified?: boolean;
}
export interface UserProfileProps {
  name: string;
  birth: string | null;
  gender: string;
  phone: number;
  avatarImageUrl: string;
}

export const initialUserProfileValues: UserProfileProps = {
  name: "",
  birth: "",
  gender: "",
  phone: 0,
  avatarImageUrl: "",
};

export const userProfileValidationSchema = Yup.object().shape({
  name: Yup.string().required("This name will appear on your profile"),
  birth: Yup.date()
    .typeError("Invalid date format")
    .max(new Date(), "Date of birth cannot be in the future")
    .min(new Date("1900-01-01"), "Date of birth cannot be before 1900")
    .test(
      "is-18-years-old",
      "You must be at least 18 years old to use Groovity",
      (value) => {
        const today = new Date();
        const ageLimit = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate(),
        );
        return value ? value <= ageLimit : false;
      },
    ),
  gender: Yup.string().oneOf(
    ["male", "female", "others"],
    "Invalid gender selection",
  ),
  phone: Yup.string().matches(phoneRegex, "Invalid phone number"),
});

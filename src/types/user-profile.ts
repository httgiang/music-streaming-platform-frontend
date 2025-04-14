import { Dayjs } from "dayjs";
import * as Yup from "yup";
import { phoneRegex } from "./auth/regex";

export interface UserProfileProps {
  avatar: string;
  avatarUrl?: string;
  name: string;
  dob: Dayjs | null;
  gender: string;
  phoneNumber: number;
  country: string;
}

export const initialUserProfileValues: UserProfileProps = {
  avatar: "",
  name: "",
  dob: null,
  gender: "",
  phoneNumber: 0,
  country: "",
};

export const userProfileValidationSchema = Yup.object().shape({
  name: Yup.string().required("This name will appear on your profile"),
  dob: Yup.date()
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
    ["male", "female", "other"],
    "Invalid gender selection",
  ),
  // phoneNumber: Yup.string().matches(phoneRegex, "Invalid phone number"),
});

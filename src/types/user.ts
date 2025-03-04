import { Dayjs } from "dayjs";
import * as Yup from "yup";

export interface UserProfileProps {
  name: string;
  dob: Dayjs | null;
  gender: string;
}

export const initialUserProfileValues: UserProfileProps = {
  name: "",
  dob: null,
  gender: "",
};

export const userProfileValidationSchema = Yup.object().shape({
  name: Yup.string().required("This name will appear on your profile"),
  dob: Yup.date()
    .max(new Date(), "Date of birth cannot be in the future")
    .min(new Date("1900-01-01"), "Date of birth cannot be before 1900"),
  gender: Yup.string().oneOf(
    ["male", "female", "other"],
    "Invalid gender selection",
  ),
});

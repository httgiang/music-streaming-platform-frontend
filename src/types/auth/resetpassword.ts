import { passwordRegex } from "@/types/auth/regex";
import * as Yup from "yup";

export interface ResetPasswordProps {
  password: string;
  confirmPassword: string;
}

export const initialResetPasswordValues: ResetPasswordProps = {
  password: "",
  confirmPassword: "",
};

export const resetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

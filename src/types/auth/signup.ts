import * as Yup from "yup";
import { passwordRegex, usernameRegex } from "./regex";

export interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

export const initialSignUpValues: SignUpProps = {
  username: "",
  email: "",
  password: "",
};

export const signUpValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username should contain minimum 3 characters")
    .max(16, "Username should contain maximum 16 characters")
    .matches(
      usernameRegex,
      "Username should contain only letters, numbers, and underscores",
    ),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      passwordRegex,
      "Password should contain at least 8 characters, 1 letter, and 1 number or 1 special character.",
    )
    .required("Password is required"),
});

import * as Yup from "yup";
import { passwordRegex } from "./regex";

export interface SignUpProps {
  username: string;
  name: string;
  email: string;
  password: string;
}

export const initialSignUpValues: SignUpProps = {
  username: "",
  name: "",
  email: "",
  password: "",
};

export const signUpValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username should contain minimum 3 characters")
    .max(16, "Username should contain maximum 16 characters"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      passwordRegex,
      "Password should contain at least 8 characters, 1 letter, and 1 number or 1 special character.",
    )
    .required("Password is required"),
});

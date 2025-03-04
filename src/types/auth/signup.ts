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
  username: Yup.string().required("Username is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(passwordRegex, "Password does not match")
    .required("Password is required"),
});

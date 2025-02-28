import * as Yup from "yup";

export interface ForgotPasswordProps {
  email: string;
}

export const initialForgotPasswordValues: ForgotPasswordProps = {
  email: "",
};

export const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

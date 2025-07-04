import * as Yup from "yup";

export interface LogInProps {
  username: string;
  password: string;
}

export const initialLogInValues: LogInProps = {
  username: "",
  password: "",
};

export const logInValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

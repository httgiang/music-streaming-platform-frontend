//Minimum 8 characters, at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.
export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

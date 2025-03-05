//Username should contain minimum 3, maximum 16 characters (could be letters / numbers / special characters: -)
export const usernameRegex = /^[a-zA-Z0-9-]{3,16}$/;

//Password should contain minimum 8 characters, including at least 1 letter, 1 number, and 1 special character.
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

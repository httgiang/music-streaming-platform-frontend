export const usernameRegex = /^[a-zA-Z0-9-]{3,16}$/;
//minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const phoneRegex = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;

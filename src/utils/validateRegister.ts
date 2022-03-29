import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.includes("@")) {
    return  [
        {
          field: "email",
          message: "invalid email",
        },
      ]
  }

  if (options.username.length <= 3) {
    return  [
        {
          field: "username length",
          message: "username length must be greater than 3",
        },
      ]
  }

  if (options.username.includes("@")) {
    return  [
        {
          field: "username",
          message: "username can not include @",
        },
      ]
  }

  if (options.password.length <= 3) {
    return  [
        {
          field: "passowrd length",
          message: "password length must be greater than 3",
        },
    ]
  }

  return null;
};

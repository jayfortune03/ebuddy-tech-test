import { compareSync, genSaltSync, hashSync } from "bcrypt";

export const getHash = (password: string) => {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
};

export const checkHash = (password: string, hashPassword?: string) => {
  return compareSync(password, hashPassword || "");
};

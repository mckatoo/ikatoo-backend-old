import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const env = (key: string) => {
  return `${process.env[key]}`;
};

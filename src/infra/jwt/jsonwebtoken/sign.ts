import { env } from "@infra/env";
import { sign as jwtSign } from "jsonwebtoken";

export type JwtOptions = {
  options: {
    id?: string;
    email?: string;
    name?: string;
    role?: string;
  };
  expiresIn?: string | number | undefined;
  /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
};

export default (options: JwtOptions) =>
  jwtSign(options.options, env("JWT_SECRET"), {
    expiresIn: options.expiresIn || "60",
  });

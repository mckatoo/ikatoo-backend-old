import { env } from "@infra/env";
import { verify as JwtVerify } from "jsonwebtoken";

export default (accessToken: string) =>
  JwtVerify(accessToken, env("JWT_SECRET"));

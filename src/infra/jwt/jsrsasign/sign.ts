import { env } from "@infra/env";
import { randomBytes } from "crypto";
import { KJUR, utf8tob64u } from "jsrsasign";

import { JwtSign } from "../";

const { jws } = KJUR;

export const jwtSign = async (options: JwtSign) => {
  if (options.expireTime < 0) {
    throw new Error("Expire Time should be greater than current time.");
  }
  const tNow = parseInt((new Date().getTime() / 1000).toFixed(0));
  const tEnd = (
    tNow + (options.expireTime || parseInt(env("JWT_EXPIRATION") || "600"))
  ).toFixed(0);
  const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
  const payload = {
    iss: `https://${env("DOMAIN")}`,
    nbf: tNow,
    iat: tNow,
    aud: `http://${env("DOMAIN")}`,
    exp: tEnd,
    jti: options.id || (env("JWT_ID") as string),
  };
  const secret = utf8tob64u(env("JWT_SECRET"));
  const token = jws.JWS.sign("HS256", header, payload, secret)

  return Promise.resolve(token);
};

import { env } from "@infra/env";
import { KJUR } from "jsrsasign";

const verifyJwt = KJUR.jws.JWS.verifyJWT;

export const jwtVerify = (token: string) => {
  const secret = env("JWT_SECRET");
  if (secret)
    return Promise.resolve(verifyJwt(token, secret, { alg: ["HS256"] }));
  return Promise.resolve(false);
};

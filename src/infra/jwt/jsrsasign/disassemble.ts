import { b64utoutf8, KJUR } from 'jsrsasign';

const readSafe = KJUR.jws.JWS.readSafeJSONString

export const jwtDisassemble = async (token: string) => {
  const headerObj = readSafe(b64utoutf8(token.split(".")[ 0 ]));
  const payloadObj = readSafe(b64utoutf8(token.split(".")[ 1 ]));

  return Promise.resolve(
    {
      header: headerObj,
      payload: payloadObj
    }
  )
}

import { jwtSign } from './jsrsasign/sign'
import { jwtValidate } from './jsrsasign/validate'
import { jwtVerify } from './jsrsasign/verification';

export type JwtSign = {
  expireTime: number // in seconds
  id: string
}

export { jwtSign, jwtValidate, jwtVerify }

import { jwtSign } from './jsrsasign/sign'
import { jwtValidate } from './jsrsasign/validate'
import { jwtVerify } from './jsrsasign/verification';

export type JwtSign = {
  /** in seconds */
  expireTime: number
  id: string
}

export { jwtSign, jwtValidate, jwtVerify }

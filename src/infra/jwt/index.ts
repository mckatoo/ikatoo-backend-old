import { jwtSign } from './jsrsasign/sign'
import { jwtDisassemble } from './jsrsasign/disassemble'
import { jwtVerify } from './jsrsasign/verification';

export type JwtSign = {
  /** in seconds */
  expireTime: number
  id: string
}

export { jwtSign, jwtDisassemble as jwtValidate, jwtVerify }

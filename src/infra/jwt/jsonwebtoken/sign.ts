import { env } from '@infra/env'
import { sign as jwtSign } from 'jsonwebtoken'

export interface JwtOptions {
  userId: string
  expiresIn?: string | number | undefined
  /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
}

export default (options: JwtOptions): string =>
  jwtSign({}, env('JWT_SECRET'), {
    subject: options.userId,
    expiresIn: options.expiresIn ?? '60s'
  })

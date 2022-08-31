import { env } from '@infra/env'
import { JwtPayload, verify as JwtVerify } from 'jsonwebtoken'

export default (accessToken: string): string | JwtPayload =>
  JwtVerify(accessToken, env('JWT_SECRET'))

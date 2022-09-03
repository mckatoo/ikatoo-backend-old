import { env } from '@infra/env'
import { verify } from 'jsonwebtoken'

export default (token: string) => {
  const valid = verify(token, env('JWT_SECRET'))
  if (valid === undefined) throw new Error('Token invalid')

  return true
}

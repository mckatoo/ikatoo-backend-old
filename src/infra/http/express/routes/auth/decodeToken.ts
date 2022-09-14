import { decode } from 'jsonwebtoken'

const decodeToken = (accessToken: string) => {
  const token = JSON.parse(JSON.stringify(decode(accessToken)))

  return {
    userId: token.sub,
    expiresIn: token.exp,
    generatedAt: token.iat
  }
}
export { decodeToken }

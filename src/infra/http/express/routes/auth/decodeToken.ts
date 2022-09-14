import { decode } from 'jsonwebtoken'

interface DecodeTokenOutput {
  userId: string
  expiresIn: number
  generatedAt: number
}

const decodeToken = (accessToken: string): DecodeTokenOutput => {
  const decodedToken = JSON.parse(JSON.stringify(decode(accessToken)))

  return {
    userId: decodedToken.sub,
    expiresIn: decodedToken.exp,
    generatedAt: decodedToken.iat
  }
}
export { decodeToken }

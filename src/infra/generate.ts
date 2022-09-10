import { randomBytes } from 'crypto'

export const generate = () => {
  return randomBytes(20).toString('hex')
}

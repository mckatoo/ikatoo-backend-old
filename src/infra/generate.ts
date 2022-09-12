import { randomBytes } from 'crypto'

export const generateString = () => {
  return randomBytes(20).toString('hex')
}

export const generateNumber = () => {
  return Math.floor(Math.random() * 10)
}

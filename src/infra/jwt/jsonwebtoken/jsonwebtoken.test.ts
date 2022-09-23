import { TokenExpiredError } from 'jsonwebtoken'
import { generateString } from '../../generate'
import isValid from './isValid'
import sign from './sign'

describe('JsonWebToken Test', () => {
  it('should create a token', async () => {
    const token = sign({
      userId: generateString(),
      expiresIn: '60s'
    })

    expect(token.split('.')).toHaveLength(3)
  })

  it('should check if is valid token', async () => {
    const token = sign({
      userId: generateString(),
      expiresIn: '60s'
    })
    expect(isValid(token)).toBe(true)
  })

  it('should invalidate token after corruption', async () => {
    const token = sign({
      userId: generateString(),
      expiresIn: '60s'
    })
    expect(() => isValid(token.replace(token[3], ')'))).toThrowError('invalid token')
  })

  it('should invalidate token after expiration', () => {
    const token = sign({
      userId: generateString(),
      expiresIn: '60s'
    })

    expect(isValid(token)).toBe(true)

    jest.useFakeTimers()
    jest.advanceTimersByTime(61000)

    expect(() => isValid(token)).toThrowError(TokenExpiredError)
  })
})

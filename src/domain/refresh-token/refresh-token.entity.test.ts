import { generateString } from '@infra/generate'

import { RefreshToken, RefreshTokenProps } from './refresh-token.entity'

describe('Test Refresh Token Test', () => {
  it('constructor without id', () => {
    const refreshTokenData: RefreshTokenProps = {
      expiresIn: 60,
      userId: generateString()
    }
    const refreshToken = RefreshToken.create(refreshTokenData)

    expect(refreshToken.toJson()).toEqual({
      id: refreshToken.id,
      ...refreshTokenData
    })
  })

  it('should constructor with id', () => {
    const refreshTokenData: RefreshTokenProps = {
      id: generateString(),
      expiresIn: 60,
      userId: generateString()
    }
    const refreshToken = RefreshToken.create(refreshTokenData)

    expect(refreshToken.toJson()).toEqual(refreshTokenData)
  })
})

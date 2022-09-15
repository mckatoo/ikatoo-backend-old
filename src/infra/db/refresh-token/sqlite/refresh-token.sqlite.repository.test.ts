import { RefreshTokenWithId } from '@domain/refresh-token/refresh-token.repository'
import { generateString } from '@infra/generate'

import database from './database'
import { RefreshTokenSqliteRepository } from './refresh-token.sqlite.repository'

describe('Refresh-Token Sqlite repository', () => {
  const repository = new RefreshTokenSqliteRepository()

  it('Should insert refresh-token', async () => {
    const refreshTokenData = {
      expiresIn: 60,
      userId: generateString()
    }
    await repository.create(refreshTokenData)

    const db = await database()
    const token = await db.get<RefreshTokenWithId>(
      'select * from refreshToken where user_id = ?',
      refreshTokenData.userId
    )

    expect(token).toEqual({
      id: token?.id,
      expires_in: refreshTokenData.expiresIn.toString(),
      user_id: refreshTokenData.userId
    })
  })

  it('Should insert refresh-token with id', async () => {
    const refreshTokenData = {
      id: generateString(),
      expiresIn: 60,
      userId: generateString()
    }
    await repository.create(refreshTokenData)

    const db = await database()
    const token = await db.get<RefreshTokenWithId>(
      'select * from refreshToken where user_id = ?',
      refreshTokenData.userId
    )

    expect(token).toEqual({
      id: refreshTokenData.id,
      expires_in: refreshTokenData.expiresIn.toString(),
      user_id: refreshTokenData.userId
    })
  })

  it('Should not insert refresh-token with unique id', async () => {
    const refreshTokenData = {
      id: generateString(),
      expiresIn: 60,
      userId: generateString()
    }
    await repository.create(refreshTokenData)

    await expect(
      repository.create(refreshTokenData)
    ).rejects.toThrowError(/unique/i)
  })

  it('Should not insert refresh-token with unique user_id', async () => {
    const refreshTokenData = {
      expiresIn: 60,
      userId: generateString()
    }
    await repository.create({
      expiresIn: 60,
      userId: refreshTokenData.userId
    })
    await expect(
      repository.create(refreshTokenData)
    ).rejects.toThrowError(/unique/i)
  })

  it('should get a refresh-token by user_id', async () => {
    const refreshTokenData = {
      expiresIn: 60,
      userId: generateString()
    }
    await repository.create(refreshTokenData)
    const refreshToken = await repository.getByUserId(refreshTokenData.userId)

    expect(refreshToken).toEqual({
      id: refreshToken.id,
      expires_in: refreshToken.expiresIn,
      user_id: refreshToken.userId
    })
  })
})

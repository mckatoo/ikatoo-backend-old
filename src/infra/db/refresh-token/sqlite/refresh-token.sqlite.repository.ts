import { RefreshTokenRepositoryInterface, RefreshTokenWithId } from '@domain/refresh-token/refresh-token.repository'
import { randomUUID } from 'crypto'

import database from './database'

export class RefreshTokenSqliteRepository implements RefreshTokenRepositoryInterface {
  async create (refreshToken: RefreshTokenWithId): Promise<void> {
    const db = await database()

    await db.run(
      'insert into refreshToken values(?,?,?)',
      refreshToken.id ?? randomUUID(),
      refreshToken.expiresIn,
      refreshToken.userId
    )

    await db.close()
  }

  async getByUserId (userId: string): Promise<RefreshTokenWithId> {
    const db = await database()
    const refreshToken = await db.get<RefreshTokenWithId>(
      'select * from refreshToken where user_id = $userId',
      {
        $userId: userId
      }
    )
    await db.close()

    if (refreshToken == null) throw new Error('Refresh-Token not found')

    return {
      id: refreshToken.id,
      expiresIn: refreshToken.expiresIn,
      userId: refreshToken.userId
    }
  }
}

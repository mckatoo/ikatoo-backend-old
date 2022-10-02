import { ConflictError } from '@application/helpers/api-erros'
import { LocalizationRepositoryInterface, LocalizationWithId } from '@domain/localization/localization.repository'
import { randomUUID } from 'crypto'

import database from './database'

export class LocalizationsSqliteRepository implements LocalizationRepositoryInterface {
  async create (localization: LocalizationWithId): Promise<void> {
    const db = await database()

    await db.run(
      'insert into localizations values(?,?,?,?)',
      localization.id ?? randomUUID(),
      localization.latitude,
      localization.longitude,
      localization.user_id
    )

    await db.close()
  }

  async getById (id: string): Promise<LocalizationWithId> {
    const db = await database()
    const localization = await db.get<LocalizationWithId>(
      'select * from localizations where id = $id',
      {
        $id: id
      }
    )
    await db.close()
    if (localization == null) throw new ConflictError('Localization not found.')

    return localization
  }

  async getByUserId (userId: string): Promise<LocalizationWithId> {
    const db = await database()
    const localization = await db.get<LocalizationWithId>(
      'select * from localizations where user_id = $userId',
      {
        $userId: userId
      }
    )
    await db.close()
    if (localization == null) throw new Error('Localizations not found')

    return localization
  }

  async getAll (): Promise<LocalizationWithId[]> {
    const db = await database()
    const allLocalization = await db.all<LocalizationWithId[]>(
      'select * from localizations'
    )
    await db.close()

    if (allLocalization == null) throw new Error('Localizations not found')

    return allLocalization
  }
}

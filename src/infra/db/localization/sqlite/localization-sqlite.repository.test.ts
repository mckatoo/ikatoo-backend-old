import { LocalizationWithId } from '@domain/localization/localization.repository'
import { generateString } from '@infra/generate'

import database from './database'
import { LocalizationsSqliteRepository } from './localization-sqlite.repository'

describe('Localizations Sqlite repository', () => {
  const repository = new LocalizationsSqliteRepository()

  it('Should insert localization', async () => {
    const localizationData: LocalizationWithId = {
      id: generateString(),
      latitude: generateString(),
      longitude: generateString(),
      user_id: generateString()
    }
    await repository.create(localizationData)

    const db = await database()
    const localization = await db.get<LocalizationWithId>(
      'select * from localizations where id = ?',
      localizationData.id
    )

    expect(localization).toEqual(localizationData)
  })

  it('Should not insert localization with existing id', async () => {
    const existingId = generateString()
    const localizationData = {
      id: existingId,
      latitude: generateString(),
      longitude: generateString(),
      user_id: generateString()
    }
    await repository.create(localizationData)
    await expect(
      repository.create({
        ...localizationData,
        id: existingId
      })
    ).rejects.toThrowError(/unique/i)
  })

  it('Should not insert localization with existing user-id', async () => {
    const existingUserId = generateString()
    const localizationData = {
      id: generateString(),
      latitude: generateString(),
      longitude: generateString(),
      user_id: existingUserId
    }
    await repository.create(localizationData)
    await expect(
      repository.create({
        ...localizationData,
        user_id: existingUserId
      })
    ).rejects.toThrowError(/unique/i)
  })

  it('should get localizations by id', async () => {
    const localizationData: LocalizationWithId = {
      id: generateString(),
      latitude: generateString(),
      longitude: generateString(),
      user_id: generateString()
    }
    await repository.create(localizationData)

    const localization = await repository.getById(localizationData.id ?? '')

    expect(localization).toEqual(localizationData)
  })

  it('should get localization by user_id', async () => {
    const localizationsData: LocalizationWithId[] = [{
      id: generateString(),
      latitude: generateString(),
      longitude: generateString(),
      user_id: generateString()
    }, {
      id: generateString(),
      latitude: generateString(),
      longitude: generateString(),
      user_id: generateString()
    }, {
      id: generateString(),
      latitude: generateString(),
      longitude: generateString(),
      user_id: generateString()
    }]
    for (let index = 0; index < localizationsData.length; index++) {
      await repository.create(localizationsData[index])
    }

    const localization = await repository.getByUserId(localizationsData[1].user_id)

    expect(localization).toEqual(localizationsData[1])
  })
})

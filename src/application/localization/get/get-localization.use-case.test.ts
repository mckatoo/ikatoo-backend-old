import { LocalizationWithId } from '@domain/localization/localization.repository'
import { LocalizationRepository } from '@infra/db/localization'
import { generateString } from '@infra/generate'
import { GetLocalizationUseCase } from './get-localization.use-case'

const repository = new LocalizationRepository()
const getUseCase = new GetLocalizationUseCase(repository)

describe('Get Localization use-case Test', () => {
  it('should get localization from the user', async () => {
    const localizationsMock: LocalizationWithId[] = [
      {
        id: generateString(),
        latitude: generateString(),
        longitude: generateString(),
        user_id: generateString()
      },
      {
        id: generateString(),
        latitude: generateString(),
        longitude: generateString(),
        user_id: generateString()
      },
      {
        id: generateString(),
        latitude: generateString(),
        longitude: generateString(),
        user_id: generateString()
      }
    ]
    for (let index = 0; index < localizationsMock.length; index++) {
      await repository.create(localizationsMock[index])
    }

    const expectedResult = await getUseCase.byUserId(localizationsMock[1].user_id)

    expect(expectedResult).toEqual(localizationsMock[1])
  })
})

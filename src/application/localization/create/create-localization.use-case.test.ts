import { LocalizationProps } from '@domain/localization/localization.entity'
import { LocalizationRepository } from '@infra/db/localization'
import { generateString } from '@infra/generate'
import { CreateLocalizationUseCase } from './create-localization.use-case'

describe('Create Localization use-case Test', () => {
  const repository = new LocalizationRepository()
  const createUseCase = new CreateLocalizationUseCase(repository)

  it('should create a new localization without id', async () => {
    const mock: LocalizationProps = {
      latitude: generateString(),
      longitude: generateString(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    const expectedResult = await repository.getByUserId(mock.user_id)

    expect(expectedResult).toEqual({
      id: expectedResult.id,
      ...mock
    })
  })

  it('should create a new localization with id', async () => {
    const mock = {
      id: generateString(),
      latitude: generateString(),
      longitude: generateString(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    const expectedResult = await repository.getByUserId(mock.user_id)

    expect(expectedResult).toEqual(mock)
  })

  it('should not create the localization with existing user_id', async () => {
    const existingUserId = generateString()
    const mock = {
      id: generateString(),
      latitude: generateString(),
      longitude: generateString(),
      user_id: existingUserId
    }
    await createUseCase.execute(mock)

    await expect(createUseCase.execute({
      ...mock,
      user_id: existingUserId
    })).rejects.toThrowError('Localization for this user already exists')
  })
})

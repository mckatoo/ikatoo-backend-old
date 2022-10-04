import { SocialLinksProps } from '@domain/social-links/social-links.entity'
import { SocialLinksRepository } from '@infra/db/social-links'
import { generateString } from '@infra/generate'
import { CreateSocialLinksUseCase } from './create-social-links.use-case'

describe('Create Social Links use-case Test', () => {
  const repository = new SocialLinksRepository()
  const createUseCase = new CreateSocialLinksUseCase(repository)

  it('should create a new social-link without id', async () => {
    const mock: SocialLinksProps = {
      name: generateString(),
      url: generateString(),
      icon_url: generateString(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    const expectedResult = await repository.getByUserId(mock.user_id)

    expect(expectedResult).toEqual([{
      id: expectedResult[0].id,
      ...mock
    }])
  })

  it('should create a new social-link with id', async () => {
    const mock = {
      id: generateString(),
      name: generateString(),
      url: generateString(),
      icon_url: generateString(),
      user_id: generateString()
    }

    await createUseCase.execute(mock)
    const expectedResult = await repository.getByUserId(mock.user_id)

    expect(expectedResult).toEqual([mock])
  })
})

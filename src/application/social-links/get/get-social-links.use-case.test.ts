import { SocialLinksWithId } from '@domain/social-links/social-links.repository'
import { UserWithId } from '@domain/user/user.repository'
import { SocialLinksRepository } from '@infra/db/social-links'
import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import { GetSocialLinksUseCase } from './get-social-links.use-case'

const userRepository = new UserRepository()
const repository = new SocialLinksRepository()
const getUseCase = new GetSocialLinksUseCase(repository)

describe('Get Social Links use-case Test', () => {
  it('should get social-links from the user', async () => {
    const userMock: UserWithId = {
      id: generateString(),
      name: generateString(),
      email: `${generateString()}@email.com`,
      username: generateString(),
      password: generateString(),
      domain: `${generateString()}.com`,
      avatar_url: '',
      avatar_alt: ''
    }
    await userRepository.create(userMock)
    let socialLinksMock: SocialLinksWithId[] = []
    for (let index = 0; index < 5; index++) {
      const socialLink: SocialLinksWithId = {
        id: generateString(),
        name: generateString(),
        url: generateString(),
        icon_url: generateString(),
        user_id: ((index % 2) === 0) ? userMock.id ?? '' : generateString()
      }
      await repository.create(socialLink)
      socialLinksMock = [...socialLinksMock, socialLink]
    }

    const expectedResult = await getUseCase.byUserId(userMock.id ?? '')

    expect(expectedResult).toEqual([
      socialLinksMock[0],
      socialLinksMock[2],
      socialLinksMock[4]
    ])
  })
})

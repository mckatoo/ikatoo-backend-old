import { SocialLinksWithId } from '@domain/social-links/social-links.repository'
import { SocialLinksRepository } from '@infra/db/social-links'
import { generateString } from '@infra/generate'
import { SearchSocialLinksUseCase } from './search-social-links.use-case'

const repository = new SocialLinksRepository()
const searchSocialLinksUseCase = new SearchSocialLinksUseCase(repository)

describe('Search SocialLinks use-case Test', () => {
  it('should return the array of the projects with same title', async () => {
    const commonName = generateString()
    let allSocialLinks: SocialLinksWithId[] = []
    for (let i = 0; i < 5; i++) {
      const newSocialLinks: SocialLinksWithId = {
        id: generateString(),
        name: i % 2 === 0 ? commonName : generateString(),
        url: generateString(),
        icon_url: generateString(),
        user_id: generateString()
      }
      await repository.create(newSocialLinks)
      allSocialLinks = [...allSocialLinks, newSocialLinks]
    }

    const projects = await searchSocialLinksUseCase.execute(commonName)
    const expectedSocialLinks = [allSocialLinks[0], allSocialLinks[2], allSocialLinks[4]]

    expect(projects).toEqual(expectedSocialLinks)
  })
})

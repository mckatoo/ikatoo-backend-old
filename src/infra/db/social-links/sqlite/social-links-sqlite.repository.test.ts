import { SocialLinksWithId } from '@domain/social-links/social-links.repository'
import { generateString } from '@infra/generate'

import database from './database'
import { SocialLinksSqliteRepository } from './social-links-sqlite.repository'

describe('SocialLinks Sqlite repository', () => {
  const repository = new SocialLinksSqliteRepository()

  it('Should insert social-link', async () => {
    const socialLinkData: SocialLinksWithId = {
      id: generateString(),
      name: generateString(),
      url: generateString(),
      icon_url: generateString(),
      user_id: generateString()
    }
    await repository.create(socialLinkData)

    const db = await database()
    const socialLink = await db.get<SocialLinksWithId>(
      'select * from socialLinks where id = ?',
      socialLinkData.id
    )

    expect(socialLink).toEqual(socialLinkData)
  })

  it('Should not insert social-link with existing id', async () => {
    const socialLinkData = {
      id: generateString(),
      name: generateString(),
      url: generateString(),
      icon_url: generateString(),
      user_id: generateString()
    }
    await repository.create(socialLinkData)
    await expect(
      repository.create(socialLinkData)
    ).rejects.toThrowError(/unique/i)
  })

  it('should get socialLinks by user_id', async () => {
    const userId = generateString()
    const socialLinksData: SocialLinksWithId[] = [{
      id: generateString(),
      name: generateString(),
      url: generateString(),
      icon_url: generateString(),
      user_id: userId
    }, {
      id: generateString(),
      name: generateString(),
      url: generateString(),
      icon_url: generateString(),
      user_id: userId
    }, {
      id: generateString(),
      name: generateString(),
      url: generateString(),
      icon_url: generateString(),
      user_id: userId
    }]
    for (let index = 0; index < socialLinksData.length; index++) {
      await repository.create(socialLinksData[index])
    }

    const socialLinks = await repository.getByUserId(userId)

    expect(socialLinks).toEqual(socialLinksData)
  })

  it('should search social-link by title', async () => {
    const commonName = generateString()
    const socialLinksData: SocialLinksWithId[] = [{
      id: generateString(),
      name: `${generateString()} ${commonName}`,
      url: generateString(),
      icon_url: generateString(),
      user_id: generateString()
    },
    {
      id: generateString(),
      name: `${generateString()} ${commonName}`,
      url: generateString(),
      icon_url: generateString(),
      user_id: generateString()
    },
    {
      id: generateString(),
      name: `${generateString()} ${commonName}`,
      url: generateString(),
      icon_url: generateString(),
      user_id: generateString()
    }]
    for (let index = 0; index < socialLinksData.length; index++) {
      await repository.create(socialLinksData[index])
    }
    const socialLinks = await repository.searchByName(commonName.toUpperCase())
    expect(socialLinks).toEqual(socialLinksData)
  })
})

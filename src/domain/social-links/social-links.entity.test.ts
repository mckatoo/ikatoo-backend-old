import { generateString } from '@infra/generate'
import { SocialLinks, SocialLinksProps } from './social-links.entity'

describe('Test SocialLinks Test', () => {
  it('constructor without id', () => {
    const socialLinksData: SocialLinksProps = {
      name: generateString(),
      url: generateString(),
      icon_url: generateString(),
      user_id: generateString()
    }
    const socialLinks = SocialLinks.create(socialLinksData)
    expect(socialLinks.toJson()).toStrictEqual({
      id: socialLinks.id,
      ...socialLinksData
    })

    expect(socialLinks.id).toBeDefined()
  })

  it('should constructor with id', () => {
    const socialLinksData: SocialLinksProps = {
      id: generateString(),
      name: generateString(),
      url: generateString(),
      icon_url: generateString(),
      user_id: generateString()
    }
    const socialLinks = SocialLinks.create(socialLinksData)

    expect(socialLinks.toJson()).toEqual(socialLinksData)
  })
})

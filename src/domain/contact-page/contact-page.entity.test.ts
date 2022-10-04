import { generateString } from '@infra/generate'

import { ContactPage, ContactPageProps } from './contact-page.entity'

describe('Test ContactPage Test', () => {
  it('constructor without id', () => {
    const contactPageData: ContactPageProps = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const contactPage = ContactPage.create(contactPageData)
    expect(contactPage.toJson()).toStrictEqual({
      id: contactPage.id,
      ...contactPageData
    })

    expect(contactPage.id).toBeDefined()
  })

  it('should constructor with id', () => {
    const contactPageData: ContactPageProps = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const contactPage = ContactPage.create(contactPageData)

    expect(contactPage.toJson()).toEqual(contactPageData)
  })
})

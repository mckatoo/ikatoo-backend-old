import { generateString } from '@infra/generate'

import { AboutPage, AboutPageProps } from './about-page.entity'

describe('Test About Page Test', () => {
  it('should return error on instance without props', () => {
    const aboutPageError = () => AboutPage.create()

    expect(aboutPageError).toThrow('Props required on contructor')
  })

  it('constructor without id', () => {
    const aboutPageData: AboutPageProps = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const aboutPage = AboutPage.create(aboutPageData)

    expect(aboutPage.toJson()).toEqual({
      id: aboutPage.id,
      ...aboutPageData,
      image: { alt: '', src: '' }
    })
  })

  it('should constructor with id', () => {
    const aboutPageData: AboutPageProps = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const id = generateString()
    const aboutPage = AboutPage.create(aboutPageData, id)

    expect(aboutPage.id).toBe(id)
  })
})

import { generateNumber, generateString } from '@infra/generate'
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
      image: { alt: '', src: '' },
      skills: []
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

  it('should update title method', () => {
    const aboutPageData: AboutPageProps = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const aboutPage = AboutPage.create(aboutPageData)
    const newTitle = generateString()
    aboutPage.updateTitle(newTitle)

    expect(aboutPage.title).toBe(newTitle)
  })

  it('should update skills method', () => {
    const aboutPageData: AboutPageProps = {
      title: 'title',
      description: 'description',
      user_id: 'skils_user_id'
    }
    const aboutPage = AboutPage.create(aboutPageData)
    const skills = [{ title: generateString(), weight: generateNumber(), user_id: generateString() }]
    aboutPage.updateSkills(skills)

    expect(aboutPage.skills).toHaveLength(1)
    expect(aboutPage.skills).toStrictEqual(skills)
  })

  it('should update image method', () => {
    const aboutPageData: AboutPageProps = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const aboutPage = AboutPage.create(aboutPageData)
    const image = { src: generateString(), alt: generateString() }
    aboutPage.updateImage(image)

    expect(aboutPage.image).toStrictEqual(image)
  })

  it('should update description method', () => {
    const aboutPageData: AboutPageProps = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const aboutPage = AboutPage.create(aboutPageData)
    const newDescription = generateString()
    aboutPage.updateDescription(newDescription)

    expect(aboutPage.description).toBe(newDescription)
  })
})

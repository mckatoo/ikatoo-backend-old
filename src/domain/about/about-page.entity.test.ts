import { AboutPage, AboutPageProps } from './about-page.entity'

describe('Test About Page Test', () => {
  it('should return error on instance without props', () => {
    const aboutPageError = () => AboutPage.create()

    expect(aboutPageError).toThrow('Props required on contructor')
  })

  it('constructor without id', () => {
    let aboutPageData: AboutPageProps = {
      title: 'title',
      description: 'description',
      user_id: 'user_id'
    }
    let aboutPage = AboutPage.create(aboutPageData)
    expect(aboutPage.props).toStrictEqual({
      ...aboutPageData,
      skills: [],
      image: { src: '', alt: '' }
    })

    aboutPageData = {
      ...aboutPageData,
      skills: [
        { name: 'skill1', levelPercent: 60 },
        { name: 'skill2', levelPercent: 40 }
      ],
      image: { src: 'src test', alt: 'alt test' }
    }
    aboutPage = AboutPage.create(aboutPageData)
    expect(aboutPage.props).toStrictEqual(aboutPageData)

    expect(aboutPage.id).toBeDefined()
  })

  it('should constructor with id', () => {
    const aboutPageData: AboutPageProps = {
      title: 'title',
      description: 'description',
      user_id: 'ctor_user_id'
    }
    const aboutPage = AboutPage.create(aboutPageData, 'test_id')

    expect(aboutPage.id).toBe('test_id')
  })

  it('should update title method', () => {
    const aboutPageData: AboutPageProps = {
      title: 'title',
      description: 'description',
      user_id: 'title_user_id'
    }
    const aboutPage = AboutPage.create(aboutPageData)
    aboutPage.updateTitle('new title')

    expect(aboutPage.title).toBe('new title')
  })

  it('should update skills method', () => {
    const aboutPageData: AboutPageProps = {
      title: 'title',
      description: 'description',
      user_id: 'skils_user_id'
    }
    const aboutPage = AboutPage.create(aboutPageData)
    const skills = [{ name: 'skill test', levelPercent: 30 }]
    aboutPage.updateSkills(skills)

    expect(aboutPage.skills).toHaveLength(1)
    expect(aboutPage.skills).toStrictEqual(skills)
  })

  it('should update image method', () => {
    const aboutPageData: AboutPageProps = {
      title: 'title',
      description: 'description',
      user_id: 'img_user_id'
    }
    const aboutPage = AboutPage.create(aboutPageData)
    const image = { src: 'src update test', alt: 'alt update test' }
    aboutPage.updateImage(image)

    expect(aboutPage.image).toStrictEqual(image)
  })

  it('should update description method', () => {
    const aboutPageData: AboutPageProps = {
      title: 'title',
      description: 'description',
      user_id: 'desc_user_id'
    }
    const aboutPage = AboutPage.create(aboutPageData)
    aboutPage.updateDescription('new description')

    expect(aboutPage.description).toBe('new description')
  })
})

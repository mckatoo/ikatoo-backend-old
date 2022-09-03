import { Skill, SkillProps } from './skill.entity'

describe('Test Skill Test', () => {
  it('should return error on instance without props', () => {
    const aboutPageError = () => Skill.create()

    expect(aboutPageError).toThrow('Props required on contructor')
  })

  it('constructor without id', () => {
    const aboutPageData: SkillProps = {
      title: 'title',
      weight: 1,
      user_id: 'user_id'
    }
    const aboutPage = Skill.create(aboutPageData)
    expect(aboutPage.toJson()).toStrictEqual({
      id: aboutPage.id,
      ...aboutPageData
    })

    expect(aboutPage.id).toBeDefined()
  })

  it('should constructor with id', () => {
    const aboutPageData: SkillProps = {
      title: 'title',
      weight: 2,
      user_id: 'ctor_user_id'
    }
    const aboutPage = Skill.create(aboutPageData, 'test_id')

    expect(aboutPage.id).toBe('test_id')
    expect(aboutPage.toJson()).toEqual({
      id: 'test_id',
      ...aboutPageData
    })
  })

  it('should update title method', () => {
    const aboutPageData: SkillProps = {
      title: 'title',
      weight: 3,
      user_id: 'title_user_id'
    }
    const aboutPage = Skill.create(aboutPageData)
    aboutPage.updateTitle('new title')

    expect(aboutPage.title).toBe('new title')
  })

  it('should update weight method', () => {
    const aboutPageData: SkillProps = {
      title: 'title',
      weight: 4,
      user_id: 'desc_user_id'
    }
    const aboutPage = Skill.create(aboutPageData)
    aboutPage.updateWeight(5)

    expect(aboutPage.weight).toBe(5)
  })
})

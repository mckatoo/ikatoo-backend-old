import { generateString } from '@infra/generate'
import { SkillsPage, SkillsPageProps } from './skills-page.entity'

describe('Test SkillsPage Test', () => {
  it('should return error on instance without props', () => {
    const skillsPageError = () => SkillsPage.create()

    expect(skillsPageError).toThrow('Props required on contructor')
  })

  it('constructor without id', () => {
    const skillsPageData: SkillsPageProps = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const skillsPage = SkillsPage.create(skillsPageData)
    expect(skillsPage.toJson()).toStrictEqual({
      id: skillsPage.id,
      ...skillsPageData
    })

    expect(skillsPage.id).toBeDefined()
  })

  it('should constructor with id', () => {
    const skillsPageData: SkillsPageProps = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const skillsPage = SkillsPage.create(skillsPageData, 'test_id')

    expect(skillsPage.id).toBe('test_id')
    expect(skillsPage.toJson()).toEqual({
      id: skillsPage.id,
      ...skillsPageData
    })
  })

  it('should update title method', () => {
    const skillsPageData: SkillsPageProps = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const skillsPage = SkillsPage.create(skillsPageData)
    skillsPage.updateTitle('new title')

    expect(skillsPage.title).toBe('new title')
  })

  it('should update description method', () => {
    const skillsPageData: SkillsPageProps = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const skillsPage = SkillsPage.create(skillsPageData)
    const newDescription = generateString()
    skillsPage.updateDescription(newDescription)

    expect(skillsPage.description).toBe(newDescription)
  })
})

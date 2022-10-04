import { generateString } from '@infra/generate'
import { SkillsPage, SkillsPageProps } from './skills-page.entity'

describe('Test SkillsPage Test', () => {
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
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    const skillsPage = SkillsPage.create(skillsPageData)

    expect(skillsPage.toJson()).toEqual(skillsPageData)
  })
})

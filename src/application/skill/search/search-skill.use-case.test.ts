import { SkillWithId } from '@domain/skill/skill.repository'
import { SkillRepository } from '@infra/db/skill'
import { generateNumber, generateString } from '@infra/generate'
import { SearchSkillUseCase } from './search-skill.use-case'

const repository = new SkillRepository()
const searchSkillUseCase = new SearchSkillUseCase(repository)

describe('Search Skill use-case Test', () => {
  it('should return the array of the skills with same title', async () => {
    const commonTitle = generateString()
    let allSkills: SkillWithId[] = []
    for (let i = 0; i < 5; i++) {
      const newSkill = {
        id: generateString(),
        title: i % 2 === 0 ? commonTitle : generateString(),
        weight: generateNumber(),
        user_id: generateString()
      }
      await repository.create(newSkill)
      allSkills = [...allSkills, newSkill]
    }

    const skills = await searchSkillUseCase.execute(commonTitle)
    const expectedSkills = [allSkills[0], allSkills[2], allSkills[4]]

    expect(skills).toEqual(expectedSkills)
  })
})

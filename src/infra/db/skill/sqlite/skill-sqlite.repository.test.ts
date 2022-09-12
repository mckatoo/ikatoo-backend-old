import { SkillWithId } from '@domain/skill/skill.repository'
import { generateNumber, generateString } from '@infra/generate'

import database from './database'
import { SkillsSqliteRepository } from './skill-sqlite.repository'

describe('Skill Sqlite repository', () => {
  const repository = new SkillsSqliteRepository()

  it('Should insert skill', async () => {
    const skillData = {
      id: generateString(),
      title: `${generateString()} title`,
      weight: generateNumber(),
      user_id: generateString()
    }
    await repository.create(skillData)

    const db = await database()
    const skill = await db.get<SkillWithId>(
      'select * from skills where id = ?',
      skillData.id
    )

    expect(skill).toEqual(skillData)
  })

  it('Should not insert skill with existing id', async () => {
    const skillData = {
      id: generateString(),
      title: generateString(),
      weight: generateNumber(),
      user_id: generateString()
    }
    await repository.create(skillData)
    await expect(
      repository.create(skillData)
    ).rejects.toThrowError(/unique/i)
  })

  it('should get skills by user_id', async () => {
    const userId = generateString()
    const skillsData = [{
      id: generateString(),
      title: generateString(),
      weight: generateNumber(),
      user_id: userId
    }, {
      id: generateString(),
      title: generateString(),
      weight: generateNumber(),
      user_id: userId
    }, {
      id: generateString(),
      title: generateString(),
      weight: generateNumber(),
      user_id: userId
    }]
    for (let index = 0; index < skillsData.length; index++) {
      await repository.create(skillsData[index])
    }

    const skills = await repository.getByUserId(userId)

    expect(skills).toEqual(skillsData)
  })

  it('should search skill by title', async () => {
    const commonTitle = generateString()
    const skillsData = [{
      id: generateString(),
      title: `${generateString()} ${commonTitle}`,
      weight: generateNumber(),
      user_id: generateString()
    },
    {
      id: generateString(),
      title: `${generateString()} ${commonTitle}`,
      weight: generateNumber(),
      user_id: generateString()
    },
    {
      id: generateString(),
      title: `${generateString()} ${commonTitle}`,
      weight: generateNumber(),
      user_id: generateString()
    }]
    for (let index = 0; index < skillsData.length; index++) {
      await repository.create(skillsData[index])
    }
    const skills = await repository.searchByTitle(commonTitle.toUpperCase())
    expect(skills).toEqual(skillsData)
  })
})

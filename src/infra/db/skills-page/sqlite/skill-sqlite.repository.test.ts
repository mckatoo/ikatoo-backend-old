import { SkillsPageWithId } from '@domain/skills-page/skills-page.repository'
import { generateString } from '@infra/generate'

import database from './database'
import { SkillsPagesSqliteRepository } from './skill-sqlite.repository'

describe('Skills Pages Sqlite repository', () => {
  const repository = new SkillsPagesSqliteRepository()

  it('Should insert skills page', async () => {
    const skillsPageData = {
      id: generateString(),
      title: `${generateString()} title`,
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(skillsPageData)

    const db = await database()
    const skill = await db.get<SkillsPageWithId>(
      'select * from skillsPages where id = ?',
      skillsPageData.id
    )

    expect(skill).toEqual(skillsPageData)
  })

  it('Should not insert skill with existing id', async () => {
    const skillsPageData = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(skillsPageData)
    await expect(
      repository.create(skillsPageData)
    ).rejects.toThrowError(/unique/i)
  })

  it('should get skills by user_id', async () => {
    const userId = generateString()
    const skillsData = [{
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: userId
    }, {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: userId
    }, {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: userId
    }]
    for (let index = 0; index < skillsData.length; index++) {
      await repository.create(skillsData[index])
    }

    const skills = await repository.getByUserId(userId)

    expect(skills).toEqual(skillsData)
  })
})

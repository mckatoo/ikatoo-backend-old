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

  it('Should not insert skills page with existing id', async () => {
    const skillsPageData = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(skillsPageData)
    await expect(
      repository.create({
        id: skillsPageData.id,
        title: generateString(),
        description: generateString(),
        user_id: generateString()
      })
    ).rejects.toThrowError(/unique/i)
  })

  it('Should not insert skills page with existing user_id', async () => {
    const skillsPageData = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(skillsPageData)
    await expect(
      repository.create({
        id: generateString(),
        title: generateString(),
        description: generateString(),
        user_id: skillsPageData.user_id
      })
    ).rejects.toThrowError(/unique/i)
  })

  it('should get skills page by user_id', async () => {
    const skillsPageData = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(skillsPageData)

    const skills = await repository.getByUserId(skillsPageData.user_id)

    expect(skills).toEqual(skillsPageData)
  })
})

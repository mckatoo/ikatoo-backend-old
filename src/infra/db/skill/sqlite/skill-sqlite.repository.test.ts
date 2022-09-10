import { SkillWithId } from '@domain/skill/skill.repository'

import database from './database'
import { SkillsSqliteRepository } from './skill-sqlite.repository'

describe('Skill Sqlite repository', () => {
  const repository = new SkillsSqliteRepository()

  it('Should insert skill', async () => {
    await repository.create({
      title: 'page1',
      weight: 6,
      user_id: 'user_test_id'
    })

    const db = await database()
    const user = await db.get<SkillWithId>(
      'select * from skills where user_id = ?',
      'user_test_id'
    )

    expect(user).toEqual({
      id: user?.id,
      title: 'page1',
      weight: 6,
      user_id: 'user_test_id'
    })
  })

  it('Should insert skill with id', async () => {
    const skillData = {
      id: 'skill_id',
      title: 'skill1',
      weight: 6,
      user_id: 'user2_id'
    }
    await repository.create(skillData)

    const db = await database()
    const skill = await db.get<SkillWithId>(
      'select * from skills where id = ?',
      'skill_id'
    )

    expect(skill).toEqual(skillData)
  })

  it('Should not insert skill with unique id', async () => {
    await expect(
      repository.create({
        id: 'skill_id',
        title: 'title2',
        weight: 3,
        user_id: 'user3_id'
      })
    ).rejects.toThrowError(/unique/i)
  })

  it('should get a skill by user_id', async () => {
    const skill = await repository.getByUserId('user2_id')

    expect(skill).toEqual({
      id: 'skill_id',
      title: 'skill1',
      weight: 6,
      user_id: 'user2_id'
    })
  })

  it('should search skill by title', async () => {
    await repository.create({
      id: 'skill_id4',
      title: 'skill4',
      weight: 4,
      user_id: 'user4_id'
    })
    const skills = await repository.searchByTitle('skill')
    expect(skills).toEqual([
      {
        id: 'skill_id',
        title: 'skill1',
        weight: 6,
        user_id: 'user2_id'
      }, {
        id: 'skill_id4',
        title: 'skill4',
        weight: 4,
        user_id: 'user4_id'
      }
    ])
  })
})

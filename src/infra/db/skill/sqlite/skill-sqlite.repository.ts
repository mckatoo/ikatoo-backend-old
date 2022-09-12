import { SkillRepositoryInterface, SkillWithId } from '@domain/skill/skill.repository'
import { randomUUID } from 'crypto'

import database from './database'

export class SkillsSqliteRepository implements SkillRepositoryInterface {
  async create (skill: SkillWithId): Promise<void> {
    const db = await database()

    await db.run(
      'insert into skills values(?,?,?,?)',
      skill.id ?? randomUUID(),
      skill.title,
      skill.weight,
      skill.user_id
    )

    await db.close()
  }

  async getByUserId (userId: string): Promise<SkillWithId[]> {
    const db = await database()
    const aboutPage = await db.all<SkillWithId[]>(
      'select * from skills where user_id = $userId',
      {
        $userId: userId
      }
    )
    await db.close()

    return aboutPage
  }

  async getAll (): Promise<SkillWithId[]> {
    const db = await database()
    const allSkill = await db.all<SkillWithId[]>(
      'select * from skills'
    )
    await db.close()

    if (allSkill == null) throw new Error('Skills not found')

    return allSkill
  }

  async searchByTitle (partialTitle: string): Promise<SkillWithId[]> {
    const db = await database()
    const skills = await db.all<SkillWithId[]>(
      `select * from skills where title like '%${partialTitle}%'`
    )
    await db.close()

    if (skills == null) throw new Error('Skills not found')

    return skills
  }
}

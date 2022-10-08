import { SkillsPageRepositoryInterface, SkillsPageWithId } from '@domain/skills-page/skills-page.repository'
import { randomUUID } from 'crypto'

import database from './database'

export class SkillsPagesSqliteRepository implements SkillsPageRepositoryInterface {
  async create (skillsPage: SkillsPageWithId): Promise<void> {
    const db = await database()

    await db.run(
      'insert into skillsPages values(?,?,?,?)',
      skillsPage.id ?? randomUUID(),
      skillsPage.title,
      skillsPage.description,
      skillsPage.user_id
    )

    await db.close()
  }

  async getByUserId (userId: string): Promise<SkillsPageWithId> {
    const db = await database()
    const skillsPage = await db.get<SkillsPageWithId>(
      'select * from skillsPages where user_id = $userId',
      {
        $userId: userId
      }
    )
    await db.close()

    if (skillsPage == null) throw new Error('Skills page not found')

    return skillsPage
  }
}

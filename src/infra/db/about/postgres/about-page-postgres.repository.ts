import { AboutPageRepositoryInterface, AboutPageUpdateType, AboutPageWithId } from '@domain/about/about-page.repository'
import { randomUUID } from 'crypto'

import database from './database'

export class AboutPagesPostgresRepository implements AboutPageRepositoryInterface {
  async getAll (): Promise<AboutPageWithId[]> {
    const db = await database()
    const allAboutPage = await db.any<AboutPageWithId>(
      'select * from aboutPages'
    )

    if (allAboutPage == null) throw new Error('About page not found')

    return allAboutPage
  }

  async create (aboutPage: AboutPageWithId): Promise<void> {
    const db = await database()
    await db.none(
      'insert into aboutPages values($1,$2,$3,$4)', [
        aboutPage.id ?? randomUUID(),
        aboutPage.title,
        aboutPage.description,
        aboutPage.user_id
      ]
    )
  }

  async update (aboutPage: AboutPageUpdateType): Promise<void> {
    const db = await database()
    await db.none(
      'update aboutPages set title = $2, description = $3 where id = $1', [
        aboutPage.id,
        aboutPage.title,
        aboutPage.description
      ]
    )
  }

  async getByUserId (userId: string): Promise<AboutPageWithId> {
    const db = await database()
    const aboutPage = await db.one<AboutPageWithId>(
      'select * from aboutPages where user_id = $1', userId
    )

    return aboutPage
  }
}

import { AboutPageRepositoryInterface, AboutPageWithId } from '@domain/about/about-page.repository'
import { UserWithId } from '@domain/user/user.repository'
import { randomUUID } from 'crypto'

import database from './database'

export class AboutPagesSqliteRepository implements AboutPageRepositoryInterface {
  async getAll (): Promise<AboutPageWithId[]> {
    const db = await database()
    const allAboutPage = await db.all<AboutPageWithId[]>(
      'select * from aboutPages'
    )
    await db.close()

    if (allAboutPage == null) throw new Error('About page not found')

    return allAboutPage
  }

  async create (aboutPage: AboutPageWithId): Promise<void> {
    const db = await database()

    await db.run(
      'insert into aboutPages values(?,?,?,?)',
      aboutPage.id ?? randomUUID(),
      aboutPage.title,
      aboutPage.description,
      aboutPage.user_id
    )

    await db.close()
  }

  async getByUserId (userId: string): Promise<AboutPageWithId> {
    const db = await database()
    const aboutPage = await db.get<AboutPageWithId>(
      'select * from aboutPages where user_id = $userId',
      {
        $userId: userId
      }
    )
    await db.close()

    if (aboutPage == null) throw new Error('About page not found')

    return aboutPage
  }

  async getByDomain (domain: string): Promise<AboutPageWithId> {
    const db = await database()
    const user = await db.get<UserWithId>('select * from users where domain = $domain', {
      $domain: domain
    })

    if (user === undefined) throw new Error('Domain not found')

    const aboutPage = await db.get<AboutPageWithId>(
      'select * from aboutPages where user_id = $userId',
      {
        $userId: user.id
      }
    )
    await db.close()

    if (aboutPage == null) throw new Error('About page not found')

    return aboutPage
  }
}

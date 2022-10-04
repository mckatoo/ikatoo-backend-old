import { ContactPageProps } from '@domain/contact-page/contact-page.entity'
import { ContactPageRepositoryInterface } from '@domain/contact-page/contact-page.repository'
import { UserWithId } from '@domain/user/user.repository'
import { randomUUID } from 'crypto'

import database from './database'

export class ContactPagesSqliteRepository implements ContactPageRepositoryInterface {
  async create (contactPage: ContactPageProps): Promise<void> {
    const db = await database()

    await db.run(
      'insert into contactsPages values(?,?,?,?)',
      contactPage.id ?? randomUUID(),
      contactPage.title,
      contactPage.description,
      contactPage.user_id
    )

    await db.close()
  }

  async getByUserId (userId: string): Promise<ContactPageProps> {
    const db = await database()
    const contactPage = await db.get<ContactPageProps>(
      'select * from contactsPages where user_id = $userId',
      {
        $userId: userId
      }
    )
    await db.close()

    if (contactPage == null) throw new Error('Contact page not found')

    return contactPage
  }

  async getByDomain (domain: string): Promise<ContactPageProps> {
    const db = await database()
    const user = await db.get<UserWithId>('select * from users where domain = $domain', {
      $domain: domain
    })

    if (user === undefined) throw new Error('Domain not found')

    const contactPage = await db.get<ContactPageProps>(
      'select * from contactsPages where user_id = $userId',
      {
        $userId: user.id
      }
    )
    await db.close()

    if (contactPage == null) throw new Error('Contact page not found')

    return contactPage
  }
}

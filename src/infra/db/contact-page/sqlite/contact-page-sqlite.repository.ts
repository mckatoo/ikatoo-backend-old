import { ContactPageProps } from '@domain/contact-page/contact-page.entity'
import { ContactPageRepositoryInterface } from '@domain/contact-page/contact-page.repository'
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
}

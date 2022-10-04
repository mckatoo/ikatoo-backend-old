import { SocialLinksRepositoryInterface, SocialLinksWithId } from '@domain/social-links/social-links.repository'
import { randomUUID } from 'crypto'

import database from './database'

export class SocialLinksSqliteRepository implements SocialLinksRepositoryInterface {
  async create (socialLinks: SocialLinksWithId): Promise<void> {
    const db = await database()
    await db.run(
      'insert into socialLinks values(?,?,?,?,?)',
      socialLinks.id ?? randomUUID(),
      socialLinks.name,
      socialLinks.url,
      socialLinks.icon_url,
      socialLinks.user_id
    )

    await db.close()
  }

  async getByUserId (userId: string): Promise<SocialLinksWithId[]> {
    const db = await database()
    const socialLinks = await db.all<SocialLinksWithId[]>(
      'select * from socialLinks where user_id = $userId',
      {
        $userId: userId
      }
    )
    await db.close()

    return socialLinks
  }

  async getAll (): Promise<SocialLinksWithId[]> {
    const db = await database()
    const allSocialLinks = await db.all<SocialLinksWithId[]>(
      'select * from socialLinks'
    )
    await db.close()

    if (allSocialLinks == null) throw new Error('SocialLinks not found')

    return allSocialLinks
  }

  async searchByName (partialName: string): Promise<SocialLinksWithId[]> {
    const db = await database()
    const socialLinks = await db.all<SocialLinksWithId[]>(
      `select * from socialLinks where name like '%${partialName}%'`
    )
    await db.close()

    if (socialLinks == null) throw new Error('SocialLinks not found')

    return socialLinks
  }
}

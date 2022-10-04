import { ContactPageProps } from '@domain/contact-page/contact-page.entity'
import { generateString } from '@infra/generate'

import { ContactPagesSqliteRepository } from './contact-page-sqlite.repository'
import database from './database'

describe('Contact Pages Sqlite repository', () => {
  const repository = new ContactPagesSqliteRepository()

  it('Should insert contact page', async () => {
    const contactPageData = {
      id: generateString(),
      title: `${generateString()} title`,
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(contactPageData)

    const db = await database()
    const skill = await db.get<ContactPageProps>(
      'select * from contactsPages where id = ?',
      contactPageData.id
    )

    expect(skill).toEqual(contactPageData)
  })

  it('Should not insert contact page with existing id', async () => {
    const contactPageData = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(contactPageData)
    await expect(
      repository.create({
        id: contactPageData.id,
        title: generateString(),
        description: generateString(),
        user_id: generateString()
      })
    ).rejects.toThrowError(/unique/i)
  })

  it('Should not insert contact page with existing user_id', async () => {
    const contactPageData = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(contactPageData)
    await expect(
      repository.create({
        id: generateString(),
        title: generateString(),
        description: generateString(),
        user_id: contactPageData.user_id
      })
    ).rejects.toThrowError(/unique/i)
  })

  it('should get contact page by user_id', async () => {
    const contactPageData = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(contactPageData)

    const contact = await repository.getByUserId(contactPageData.user_id)

    expect(contact).toEqual(contactPageData)
  })
})

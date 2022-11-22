import { AboutPageWithId } from '@domain/about/about-page.repository'
import { generateString } from '@infra/generate'

import { AboutPagesPostgresRepository } from './about-page-postgres.repository'
import database from './database'

describe('About Postgres repository', () => {
  const repository = new AboutPagesPostgresRepository()

  it('Should insert about page', async () => {
    const aboutPageData = {
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(aboutPageData)

    const db = await database()
    const user = await db.one<AboutPageWithId>(
      'select * from aboutPages where title = $1 and description = $2 and user_id = $3',
      [aboutPageData.title, aboutPageData.description, aboutPageData.user_id]
    )

    expect(user).toEqual({
      id: user?.id,
      ...aboutPageData
    })
  })

  it('Should insert about page with id', async () => {
    const aboutPageData = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(aboutPageData)

    const db = await database()
    const user = await db.one<AboutPageWithId>(
      'select * from aboutPages where id = $1',
      aboutPageData.id
    )

    expect(user).toEqual(aboutPageData)
  })

  it('Should not insert about page with unique id', async () => {
    const aboutPageData = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create({
      id: aboutPageData.id,
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    })
    await expect(repository.create(aboutPageData)).rejects.toThrowError(
      /unique/i
    )
  })

  it('Should not insert about page with unique user_id', async () => {
    const aboutPageData = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create({
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: aboutPageData.user_id
    })
    await expect(repository.create(aboutPageData)).rejects.toThrowError(
      /unique/i
    )
  })

  it('should get a about page by user_id', async () => {
    const aboutPageData = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(aboutPageData)
    const aboutPage = await repository.getByUserId(aboutPageData.user_id)

    expect(aboutPage).toEqual(aboutPageData)
  })

  it('Should update about page', async () => {
    const aboutPageData = {
      id: generateString(),
      title: generateString(),
      description: generateString(),
      user_id: generateString()
    }
    await repository.create(aboutPageData)

    const newData = {
      ...aboutPageData,
      title: `New Title ${generateString(5)}`,
      description: `New Description ${generateString()}`
    }
    await repository.update(newData)

    const db = await database()
    const user = await db.one<AboutPageWithId>(
      'select * from aboutPages where id = $1',
      aboutPageData.id
    )

    expect(user).toEqual(newData)
  })
})

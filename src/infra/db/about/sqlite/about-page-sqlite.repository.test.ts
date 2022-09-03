import { AboutPageWithId } from '@domain/about/about-page.repository'
import { clearAboutPagesSqliteRepository, clearUserSqliteRepository } from '@infra/db/sqlite'
import { UserSqliteRepository } from '@infra/db/user/sqlite/user-sqlite.repository'

import { AboutPagesSqliteRepository } from './about-page-sqlite.repository'
import database from './database'

describe('About Sqlite repository', () => {
  afterAll(async () => {
    await clearAboutPagesSqliteRepository()
    await clearUserSqliteRepository()
  })

  beforeAll(async () => {
    await clearAboutPagesSqliteRepository()
    await clearUserSqliteRepository()
  })

  const repository = new AboutPagesSqliteRepository()

  it('Should insert about page', async () => {
    await repository.create({
      title: 'page1',
      description: 'page 1 description',
      user_id: 'user_test_id'
    })

    const db = await database()
    const user = await db.get<AboutPageWithId>(
      'select * from aboutPages where user_id = ?',
      'user_test_id'
    )

    expect(user).toEqual({
      id: user?.id,
      title: 'page1',
      description: 'page 1 description',
      user_id: 'user_test_id'
    })
  })

  it('Should insert about page with id', async () => {
    await repository.create({
      id: 'test_id',
      title: 'page2',
      description: 'page 2 description',
      user_id: 'user_test_id2'
    })

    const db = await database()
    const user = await db.get<AboutPageWithId>(
      'select * from aboutPages where id = ?',
      'test_id'
    )

    expect(user).toEqual({
      id: 'test_id',
      title: 'page2',
      description: 'page 2 description',
      user_id: 'user_test_id2'
    })
  })

  it('Should not insert about page with unique id', async () => {
    await expect(
      repository.create({
        id: 'test_id',
        title: 'title test3',
        description: 'desc3 sqlite',
        user_id: 'user_test_id3'
      })
    ).rejects.toThrowError(/unique/i)
  })

  it('Should not insert about page with unique user_id', async () => {
    await expect(
      repository.create({
        title: 'title test',
        description: 'desc sqlite',
        user_id: 'user_test_id'
      })
    ).rejects.toThrowError(/unique/i)
  })

  it('should get a about page by', async () => {
    const aboutPage = await repository.getByUserId('user_test_id2')

    expect(aboutPage).toEqual({
      id: 'test_id',
      title: 'page2',
      description: 'page 2 description',
      user_id: 'user_test_id2'
    })
  })

  it('should get a about page by domain', async () => {
    const userRepository = new UserSqliteRepository()
    await userRepository.create({
      id: 'id_7',
      name: 'User test',
      username: 'user_test',
      email: 'test@user.com',
      password: '123123kj',
      domain: 'test.com.ts'
    })
    const aboutPageData = {
      id: 'about_page_id',
      title: 'about page title',
      description: 'about page desc',
      user_id: 'id_7'
    }
    await repository.create(aboutPageData)
    const aboutPage = await repository.getByDomain('test.com.ts')

    expect(aboutPage).toEqual(aboutPageData)
  })
})

import { AboutPageWithId } from '@domain/about/about-page.repository'
import { clearAboutPagesSqliteRepository } from '@infra/db/sqlite'

import { AboutPagesSqliteRepository } from './about-page-sqlite.repository'
import database from './database'

describe('About Sqlite repository', () => {
  afterAll(async () => {
    await clearAboutPagesSqliteRepository()
  })

  beforeAll(async () => {
    await clearAboutPagesSqliteRepository()
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

  // it('Should not insert user with unique data', async () => {
  //   await expect(
  //     repository.create({
  //       name: 'Test sqlite',
  //       username: 'test_sqlite',
  //       email: 'test@sqlite.com',
  //       password: 'test123'
  //     })
  //   ).rejects.toThrowError(/unique/i)
  // })

  // it('should get a user by username', async () => {
  //   const user = await repository.getByUsername('test_sqlite2')

  //   expect(user).toEqual({
  //     id: user.id,
  //     name: 'Test sqlite2',
  //     username: 'test_sqlite2',
  //     email: 'test@sqlite.com2',
  //     password: 'test1232'
  //   })
  // })

  // it('should get a user by email', async () => {
  //   const user = await repository.getByEmail('test@sqlite.com3')

  //   expect(user).toEqual({
  //     id: user.id,
  //     name: 'Test sqlite3',
  //     username: 'test_sqlite3',
  //     email: 'test@sqlite.com3',
  //     password: 'test1233'
  //   })
  // })

  // it('should get users with contain partial name', async () => {
  //   await repository.create({
  //     name: 'Search sqlite',
  //     username: 'test_sqlite4',
  //     email: 'test@sqlite.com4',
  //     password: 'test1233'
  //   })
  //   await repository.create({
  //     name: 'Search sqlite5',
  //     username: 'test_sqlite45',
  //     email: 'test@sqlite.com45',
  //     password: 'test12335'
  //   })

  //   const users = await repository.searchByName('search')

  //   expect(users).toEqual([
  //     {
  //       id: users[0].id,
  //       name: 'Search sqlite',
  //       username: 'test_sqlite4',
  //       email: 'test@sqlite.com4',
  //       password: 'test1233'
  //     },
  //     {
  //       id: users[1].id,
  //       name: 'Search sqlite5',
  //       username: 'test_sqlite45',
  //       email: 'test@sqlite.com45',
  //       password: 'test12335'
  //     }
  //   ])
  // })

  // it('should get all registers on users table', async () => {
  //   const db = await database()
  //   await db.run('delete from users')
  //   await db.run(`insert into users (id, name, username, email, password) values
  //   ('id1', 'name1', 'username1', 'email1', 'pass1'),
  //   ('id2', 'name2', 'username2', 'email2', 'pass2'),
  //   ('id3', 'name3', 'username3', 'email3', 'pass3'),
  //   ('id4', 'name4', 'username4', 'email4', 'pass4')
  //   `)

  //   const users = await repository.getAll()

  //   expect(users).toEqual([
  //     {
  //       id: 'id1',
  //       name: 'name1',
  //       username: 'username1',
  //       email: 'email1',
  //       password: 'pass1'
  //     },
  //     {
  //       id: 'id2',
  //       name: 'name2',
  //       username: 'username2',
  //       email: 'email2',
  //       password: 'pass2'
  //     },
  //     {
  //       id: 'id3',
  //       name: 'name3',
  //       username: 'username3',
  //       email: 'email3',
  //       password: 'pass3'
  //     },
  //     {
  //       id: 'id4',
  //       name: 'name4',
  //       username: 'username4',
  //       email: 'email4',
  //       password: 'pass4'
  //     }
  //   ])
  // })

  // it('should delete a row of the registers', async () => {
  //   await repository.create({
  //     name: 'Delete sqlite',
  //     username: 'test_delete',
  //     email: 'delete@sqlite.com4',
  //     password: 'delete1233'
  //   })
  //   const user = await repository.getByEmail('delete@sqlite.com4')

  //   expect(user).toEqual({
  //     id: user.id,
  //     ...user
  //   })
  //   await repository.remove(user.id ?? '')

  //   await expect(
  //     repository.getByEmail('delete@sqlite.com4')
  //   ).rejects.toThrowError('User not found')
  // })
})

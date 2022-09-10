import { UserProps } from '@domain/user/user.entity'
import { generate } from '@infra/generate'
import database from './database'
import { UserSqliteRepository } from './user-sqlite.repository'

describe('User Sqlite repository', () => {
  const repository = new UserSqliteRepository()

  it('Should insert user', async () => {
    const mock1 = {
      name: generate(),
      username: generate(),
      email: generate(),
      password: generate(),
      domain: generate()
    }
    const mock2 = {
      name: generate(),
      username: generate(),
      email: generate(),
      password: generate(),
      domain: generate()
    }
    const mock3 = {
      name: generate(),
      username: generate(),
      email: generate(),
      password: generate(),
      domain: generate()
    }
    await repository.create(mock1)
    await repository.create(mock2)
    await repository.create(mock3)

    const db = await database()
    const user = await db.get<UserProps>(
      'select * from users where username = ?',
      mock2.username
    )

    expect(user?.username).toBe(mock2.username)
  })

  it('Should not insert user with duplicated data', async () => {
    const mock = {
      name: generate(),
      username: generate(),
      email: generate(),
      password: generate(),
      domain: generate()
    }
    await repository.create(mock)
    await expect(
      repository.create(mock)
    ).rejects.toThrowError(/unique/i)
  })

  it('should get a user by username', async () => {
    const mock = {
      name: generate(),
      username: generate(),
      email: generate(),
      password: generate(),
      domain: generate()
    }
    await repository.create(mock)
    const user = await repository.getByUsername(mock.username)

    expect(user).toEqual({
      id: user?.id,
      ...mock
    })
  })

  it('should get a user by email', async () => {
    const mock = {
      name: generate(),
      username: generate(),
      email: generate(),
      password: generate(),
      domain: generate()
    }
    await repository.create(mock)

    const user = await repository.getByEmail(mock.email)

    expect(user).toEqual({
      id: user?.id,
      ...mock
    })
  })

  it('should get a user by domain', async () => {
    const mock = {
      name: generate(),
      username: generate(),
      email: generate(),
      password: generate(),
      domain: generate()
    }
    await repository.create(mock)
    const user = await repository.getByDomain(mock.domain)

    expect(user).toEqual({
      id: user?.id,
      ...mock
    })
  })

  it('should get users with contain partial name', async () => {
    const mock1 = {
      name: `${generate()} Search`,
      username: generate(),
      email: generate(),
      password: generate(),
      domain: generate()
    }
    const mock2 = {
      name: `${generate()} Search`,
      username: generate(),
      email: generate(),
      password: generate(),
      domain: generate()
    }
    await repository.create(mock1)
    await repository.create(mock2)

    const users = await repository.searchByName('search')

    expect(users).toEqual([
      {
        id: users[0].id,
        ...mock1
      },
      {
        id: users[1].id,
        ...mock2
      }
    ])
  })

  it('should get all registers on users table', async () => {
    const db = await database()
    await db.run('delete from users')
    const user1 = {
      id: generate(),
      name: generate(),
      username: generate(),
      email: `${generate()}@mail.com`,
      password: generate(),
      domain: `${generate()}.com`
    }
    const user2 = {
      id: generate(),
      name: generate(),
      username: generate(),
      email: `${generate()}@mail.com`,
      password: generate(),
      domain: `${generate()}.com`
    }
    const user3 = {
      id: generate(),
      name: generate(),
      username: generate(),
      email: `${generate()}@mail.com`,
      password: generate(),
      domain: `${generate()}.com`
    }
    const user4 = {
      id: generate(),
      name: generate(),
      username: generate(),
      email: `${generate()}@mail.com`,
      password: generate(),
      domain: `${generate()}.com`
    }
    await db.run(`insert into users (id, name, username, email, password, domain) values
    ('${user1.id}', '${user1.name}', '${user1.username}', '${user1.email}', '${user1.password}', '${user1.domain}'),
    ('${user2.id}', '${user2.name}', '${user2.username}', '${user2.email}', '${user2.password}', '${user2.domain}'),
    ('${user3.id}', '${user3.name}', '${user3.username}', '${user3.email}', '${user3.password}', '${user3.domain}'),
    ('${user4.id}', '${user4.name}', '${user4.username}', '${user4.email}', '${user4.password}', '${user4.domain}')
    `)

    const users = await repository.getAll()

    expect(users).toEqual([user1, user2, user3, user4])
  })

  it('should delete a row of the registers', async () => {
    const mock = {
      name: generate(),
      username: generate(),
      email: `${generate()}@sqlite.com4`,
      password: generate(),
      domain: `${generate()}.com`
    }
    await repository.create(mock)
    const user = await repository.getByEmail(mock.email)

    expect(user).toEqual({
      id: user?.id,
      ...mock
    })
    await repository.remove(user?.id ?? '')

    const expectedUndefinedUser = await repository.getByEmail(mock.email)
    expect(expectedUndefinedUser).not.toBeDefined()
  })
})

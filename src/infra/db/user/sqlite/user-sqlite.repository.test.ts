import { UserProps } from '@domain/user/user.entity'
import { generateString } from '@infra/generate'
import database from './database'
import { UserSqliteRepository } from './user-sqlite.repository'

describe('User Sqlite repository', () => {
  const repository = new UserSqliteRepository()

  it('Should insert user', async () => {
    const mock1 = {
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    const mock2 = {
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    const mock3 = {
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
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
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    await repository.create(mock)
    await expect(
      repository.create(mock)
    ).rejects.toThrowError(/unique/i)
  })

  it('should get a user by id', async () => {
    const mock = {
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    await repository.create(mock)
    const user = await repository.getById(mock.id)

    expect(user).toEqual({
      ...mock,
      is_admin: +mock.is_admin
    })
  })

  it('should get a user by username', async () => {
    const mock = {
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    await repository.create(mock)
    const user = await repository.getByUsername(mock.username)

    expect(user).toEqual({
      id: user?.id,
      ...mock,
      is_admin: +mock.is_admin
    })
  })

  it('should get a user by email', async () => {
    const mock = {
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    await repository.create(mock)

    const user = await repository.getByEmail(mock.email)

    expect(user).toEqual({
      id: user?.id,
      ...mock,
      is_admin: +mock.is_admin
    })
  })

  it('should get a user by admin', async () => {
    const user = await repository.getAdmin()

    expect(user?.id).toBe('testId')
  })

  it('should get users with contain partial name', async () => {
    const mock1 = {
      name: `${generateString()} Search`,
      username: generateString(),
      email: generateString(),
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    const mock2 = {
      name: `${generateString()} Search`,
      username: generateString(),
      email: generateString(),
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    await repository.create(mock1)
    await repository.create(mock2)

    const users = await repository.searchByName('search')

    expect(users.length).toBeGreaterThanOrEqual(2)
  })

  it('should get all registers on users table', async () => {
    const db = await database()

    const user1 = {
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    const user2 = {
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    const user3 = {
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    const user4 = {
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@mail.com`,
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    await db.run(`insert into users (id, name, username, email, password, is_admin, avatar_url, avatar_alt) values
    ('${user1.id}', '${user1.name}', '${user1.username}', '${user1.email}', '${user1.password}', '${user1.is_admin.toString()}', '${user1.avatar_url}', '${user1.avatar_alt}'),
    ('${user2.id}', '${user2.name}', '${user2.username}', '${user2.email}', '${user2.password}', '${user2.is_admin.toString()}', '${user2.avatar_url}', '${user2.avatar_alt}'),
    ('${user3.id}', '${user3.name}', '${user3.username}', '${user3.email}', '${user3.password}', '${user3.is_admin.toString()}', '${user3.avatar_url}', '${user3.avatar_alt}'),
    ('${user4.id}', '${user4.name}', '${user4.username}', '${user4.email}', '${user4.password}', '${user4.is_admin.toString()}', '${user4.avatar_url}', '${user4.avatar_alt}')
    `)

    const users = await repository.getAll()

    expect(users.length).toBeGreaterThanOrEqual(4)
  })

  it('should delete a row of the registers', async () => {
    const mock = {
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@sqlite.com4`,
      password: generateString(),
      is_admin: false,
      avatar_url: '',
      avatar_alt: ''
    }
    await repository.create(mock)
    const user = await repository.getByEmail(mock.email)

    expect(user).toEqual({
      id: user?.id,
      ...mock,
      is_admin: +mock.is_admin
    })
    await repository.remove(user?.id ?? '')

    const expectedUndefinedUser = await repository.getByEmail(mock.email)
    expect(expectedUndefinedUser).not.toBeDefined()
  })
})

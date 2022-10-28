import { UserProps } from '@domain/user/user.entity'
import { UserWithId } from '@domain/user/user.repository'
import { generateString } from '@infra/generate'
import database from './database'
import { UserPostgresRepository } from './user-postgres.repository'

describe('User Postgres repository', () => {
  const repository = new UserPostgresRepository()

  beforeEach(async () => {
    const db = await database()
    await db.none('delete from users;')
  })

  it('Should insert user', async () => {
    const mock1 = {
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      domain: generateString(),
      avatar_url: '',
      avatar_alt: ''
    }
    const mock2 = {
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      domain: generateString(),
      avatar_url: '',
      avatar_alt: ''
    }
    const mock3 = {
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      domain: generateString(),
      avatar_url: '',
      avatar_alt: ''
    }
    await repository.create(mock1)
    await repository.create(mock2)
    await repository.create(mock3)

    const db = await database()
    const user = await db.one<UserProps>(
      'select * from users where username = $1',
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
      domain: generateString(),
      avatar_url: '',
      avatar_alt: ''
    }
    await repository.create(mock)
    await expect(repository.create(mock)).rejects.toThrowError(/unique/i)
  })

  it('should get a user by id', async () => {
    const mock = {
      id: generateString(),
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      domain: generateString(),
      avatar_url: '',
      avatar_alt: ''
    }
    await repository.create(mock)
    const user = await repository.getById(mock.id)

    expect(user).toEqual(mock)
  })

  it('should get a user by username', async () => {
    const mock = {
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      domain: generateString(),
      avatar_url: '',
      avatar_alt: ''
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
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      domain: generateString(),
      avatar_url: '',
      avatar_alt: ''
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
      name: generateString(),
      username: generateString(),
      email: generateString(),
      password: generateString(),
      domain: generateString(),
      avatar_url: '',
      avatar_alt: ''
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
      name: `${generateString()} Search`,
      username: generateString(),
      email: generateString(),
      password: generateString(),
      domain: generateString(),
      avatar_url: '',
      avatar_alt: ''
    }
    const mock2 = {
      name: `${generateString()} Search`,
      username: generateString(),
      email: generateString(),
      password: generateString(),
      domain: generateString(),
      avatar_url: '',
      avatar_alt: ''
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
    let mockedUsers: Array<Required<UserWithId>> = []
    for (let index = 0; index < 4; index++) {
      const newUser = {
        id: generateString(),
        name: generateString(),
        username: generateString(),
        email: `${generateString()}@mail.com`,
        password: generateString(),
        domain: `${generateString()}.com`,
        avatar_url: generateString(),
        avatar_alt: generateString()
      }
      mockedUsers = [...mockedUsers, newUser]
    }

    let formatedUsers = ''
    for (let index = 0; index < mockedUsers.length; index++) {
      formatedUsers =
        formatedUsers +
        `
          ('${mockedUsers[index].id}',
          '${mockedUsers[index].name}',
          '${mockedUsers[index].username}',
          '${mockedUsers[index].email}',
          '${mockedUsers[index].password}',
          '${mockedUsers[index].domain}',
          '${mockedUsers[index].avatar_url}',
          '${mockedUsers[index].avatar_alt}')
          ${index < mockedUsers.length - 1 ? ',' : ''}
        `
    }

    const insertQuery = `insert into users (
      id, name, username, email, password, domain, avatar_url, avatar_alt
      ) values ${formatedUsers}`

    const db = await database()
    await db.none(insertQuery)
    const users = await repository.getAll()

    expect(users).toEqual(mockedUsers)
  })

  it('should delete a row of the registers', async () => {
    const mock = {
      name: generateString(),
      username: generateString(),
      email: `${generateString()}@postgres.com4`,
      password: generateString(),
      domain: `${generateString()}.com`,
      avatar_url: '',
      avatar_alt: ''
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

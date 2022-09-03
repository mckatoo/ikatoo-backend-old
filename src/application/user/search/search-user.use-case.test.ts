import { clearUserSqliteRepository } from '@infra/db/sqlite'
import { UserRepository } from '@infra/db/user'
import { CreateUserUseCase } from '../create/create-user.use-case'
import { SearchUserUseCase } from './search-user.use-case'

describe('Search User use-case Test', () => {
  const repository = new UserRepository()
  const createUseCase = new CreateUserUseCase(repository)
  const searchUseCase = new SearchUserUseCase(repository)

  beforeAll(async () => {
    await clearUserSqliteRepository()
  })

  afterAll(async () => {
    await clearUserSqliteRepository()
  })

  it('should search users with last name', async () => {
    const users = [
      {
        name: 'User Test Rakuna',
        email: 'rakuna@user.com',
        username: 'rakuna',
        password: '1234521312',
        domain: 'rakuna.com'
      },
      {
        name: 'User2 Test Rakuna',
        email: 'matata@user.com',
        username: 'matata',
        password: '1234521312',
        domain: 'matata.com'
      }
    ]
    await createUseCase.execute(users[0])
    await createUseCase.execute(users[1])
    const output = await searchUseCase.byNamePart('rakuna')

    expect(output).toHaveLength(2)
    expect(output).toEqual([
      {
        name: 'User Test Rakuna',
        email: 'rakuna@user.com',
        username: 'rakuna',
        domain: 'rakuna.com'
      },
      {
        name: 'User2 Test Rakuna',
        email: 'matata@user.com',
        username: 'matata',
        domain: 'matata.com'
      }
    ])
  })
})

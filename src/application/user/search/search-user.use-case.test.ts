import { clearUserSqliteRepository } from '@infra/db/sqlite'
import { UserRepository } from '@infra/db/user'
import { generate } from '@infra/generate'
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
    const lastname = 'UniquelastnameXYZ'
    const user1 = {
      name: `${generate()} ${lastname}`,
      email: `${generate()}@user.com`,
      username: generate(),
      password: generate(),
      domain: `${generate()}.com`
    }
    const user2 = {
      name: `${generate()} ${lastname}`,
      email: `${generate()}@user.com`,
      username: generate(),
      password: generate(),
      domain: `${generate()}.com`
    }
    await createUseCase.execute(user1)
    await createUseCase.execute(user2)
    const output = await searchUseCase.byNamePart(lastname)

    expect(output).toHaveLength(2)
    expect(output).toEqual([
      {
        ...user1,
        password: undefined
      }, {
        ...user2,
        password: undefined
      }])
  })
})

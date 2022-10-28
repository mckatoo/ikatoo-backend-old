import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import { CreateUserUseCase } from '../create/create-user.use-case'
import { SearchUserUseCase } from './search-user.use-case'

describe('Search User use-case Test', () => {
  const repository = new UserRepository()
  const createUseCase = new CreateUserUseCase(repository)
  const searchUseCase = new SearchUserUseCase(repository)

  beforeEach(async () => {
    await repository.clear()
  })

  it('should search users with last name', async () => {
    const lastname = 'search-user-use-case-test'
    const user1 = {
      name: `${generateString()} ${lastname}`,
      email: `${generateString()}@user.com`,
      username: generateString(),
      password: generateString(),
      domain: `${generateString()}.com`,
      avatar_url: '',
      avatar_alt: ''
    }
    const user2 = {
      name: `${generateString()} ${lastname}`,
      email: `${generateString()}@user.com`,
      username: generateString(),
      password: generateString(),
      domain: `${generateString()}.com`,
      avatar_url: '',
      avatar_alt: ''
    }
    const id1 = (await createUseCase.execute(user1))?.id
    const id2 = (await createUseCase.execute(user2))?.id
    const output = await searchUseCase.byNamePart(lastname)

    expect(output).toHaveLength(2)
    expect(output).toEqual([
      {
        id: id1,
        ...user1,
        password: undefined
      },
      {
        id: id2,
        ...user2,
        password: undefined
      }
    ])
  })
})

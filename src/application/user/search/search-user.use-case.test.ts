import { UserWithId } from '@domain/user/user.repository'
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
    let users: Array<Omit<UserWithId, 'password'>> = []
    for (let index = 0; index < 4; index++) {
      const user = {
        id: generateString(),
        name: `${generateString()} ${lastname}`,
        email: `${generateString()}@user.com`,
        username: generateString(),
        password: generateString(),
        domain: `${generateString()}.com`,
        avatar_url: '',
        avatar_alt: ''
      }
      await createUseCase.execute(user)
      users = [
        ...users,
        {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          domain: user.domain,
          avatar_url: user.avatar_url,
          avatar_alt: user.avatar_alt
        }
      ]
    }
    const output = await searchUseCase.byNamePart(lastname)

    const sort = (array: any[]) =>
      array.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))

    expect(output).toHaveLength(4)
    expect(sort(output)).toEqual(sort(users))
  })
})

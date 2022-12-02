import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import { CreateUserUseCase } from '../create/create-user.use-case'
import { GetUserUseCase } from './get-user.use-case'

describe('Get User use-case Test', () => {
  const repository = new UserRepository()
  const createUseCase = new CreateUserUseCase(repository)
  const getUseCase = new GetUserUseCase(repository)

  beforeEach(async () => {
    await repository.clear()
  })

  it('should get a user by email', async () => {
    const user = {
      name: generateString(),
      email: `${generateString()}@email.com`,
      username: generateString(),
      password: generateString(),
      is_admin: true,
      avatar_url: '',
      avatar_alt: ''
    }
    await createUseCase.execute(user)
    const expected = await getUseCase.byEmail(user.email)

    expect(expected).toEqual({
      id: expected.id,
      ...user,
      password: undefined
    })
  })

  it('should get a user by username', async () => {
    const user = {
      name: generateString(),
      email: `${generateString()}@email.com`,
      username: generateString(),
      password: generateString(),
      is_admin: true,
      avatar_url: '',
      avatar_alt: ''
    }
    await createUseCase.execute(user)
    const expected = await getUseCase.byUsername(user.username)

    expect(expected).toEqual({
      id: expected.id,
      ...user,
      password: undefined
    })
  })

  it('should get the admin user', async () => {
    const user = {
      name: generateString(),
      email: `${generateString()}@email.com`,
      username: generateString(),
      password: generateString(),
      is_admin: true,
      avatar_url: '',
      avatar_alt: ''
    }
    await createUseCase.execute(user)
    const expected = await getUseCase.byAdmin()

    expect(expected).toEqual({
      id: expected.id,
      ...user,
      password: undefined
    })
  })

  it('should get a user by id', async () => {
    const user = {
      id: generateString(),
      name: generateString(),
      email: `${generateString()}@email.com`,
      username: generateString(),
      password: generateString(),
      is_admin: true,
      avatar_url: '',
      avatar_alt: ''
    }
    await createUseCase.execute(user)
    const expected = await getUseCase.byId(user.id)

    expect(expected).toEqual({
      ...user,
      password: undefined
    })
  })
})

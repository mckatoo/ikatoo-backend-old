import { UserRepository } from '@infra/db/user'
import { generateString } from '@infra/generate'
import { CreateUserUseCase } from '../create/create-user.use-case'
import { GetUserUseCase } from './get-user.use-case'

describe('Get User use-case Test', () => {
  const repository = new UserRepository()
  const createUseCase = new CreateUserUseCase(repository)
  const getUseCase = new GetUserUseCase(repository)

  it('should get a user by email', async () => {
    const user = {
      name: generateString(),
      email: `${generateString()}@email.com`,
      username: generateString(),
      password: generateString(),
      domain: `${generateString()}.com`
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
      domain: `${generateString()}.com`
    }
    await createUseCase.execute(user)
    const expected = await getUseCase.byUsername(user.username)

    expect(expected).toEqual({
      id: expected.id,
      ...user,
      password: undefined
    })
  })

  it('should get a user by domain', async () => {
    const user = {
      name: generateString(),
      email: `${generateString()}@email.com`,
      username: generateString(),
      password: generateString(),
      domain: `${generateString()}.com`
    }
    await createUseCase.execute(user)
    const expected = await getUseCase.byUsername(user.username)

    expect(expected).toEqual({
      id: expected.id,
      ...user,
      password: undefined
    })
  })
})

import { UserRepository } from '@infra/db/user'
import { generate } from '@infra/generate'
import { CreateUserUseCase } from '../create/create-user.use-case'
import { GetUserUseCase } from './get-user.use-case'

describe('Get User use-case Test', () => {
  const repository = new UserRepository()
  const createUseCase = new CreateUserUseCase(repository)
  const getUseCase = new GetUserUseCase(repository)

  it('should get a user by email', async () => {
    const user = {
      name: generate(),
      email: `${generate()}@email.com`,
      username: generate(),
      password: generate(),
      domain: `${generate()}.com`
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
      name: generate(),
      email: `${generate()}@email.com`,
      username: generate(),
      password: generate(),
      domain: `${generate()}.com`
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
      name: generate(),
      email: `${generate()}@email.com`,
      username: generate(),
      password: generate(),
      domain: `${generate()}.com`
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

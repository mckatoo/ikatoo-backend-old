import { UserRepository } from '@infra/db/user'
import { generate } from '@infra/generate'

import { CreateUserUseCase } from './create-user.use-case'

describe('Create User use-case Test', () => {
  const repository = new UserRepository()
  const createUseCase = new CreateUserUseCase(repository)

  it('should create a new user without id', async () => {
    const mock = {
      name: generate(),
      email: `${generate()}@mail.com`,
      username: generate(),
      password: generate(),
      domain: `${generate()}.com`
    }

    await createUseCase.execute(mock)
    const expectedUser = await repository.getByUsername(mock.username)

    expect({ ...expectedUser, password: undefined }).toStrictEqual({
      ...mock,
      id: expectedUser?.id,
      password: undefined
    })
  })

  it('should create a new user with id', async () => {
    const mock = {
      id: generate(),
      name: generate(),
      email: `${generate()}@mail.com`,
      username: generate(),
      password: generate(),
      domain: `${generate()}.com`
    }

    await createUseCase.execute(mock)
    const expectedUser = await repository.getByUsername(mock.username)

    expect({ ...expectedUser, password: undefined }).toStrictEqual({
      ...mock,
      password: undefined
    })
  })

  it('should not create a duplicated user', async () => {
    const mock = {
      id: generate(),
      name: generate(),
      email: `${generate()}@mail.com`,
      username: generate(),
      password: generate(),
      domain: `${generate()}.com`
    }

    await createUseCase.execute(mock)

    await expect(createUseCase.execute(mock)).rejects.toThrowError('User already exists')
  })
})
